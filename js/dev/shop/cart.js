import { userCan, parseResponse, isDisbledBtn, disableBtn, unDisableBtn, is_checkout } from "./functions.js";
import { AlertModal, ModalCart, PriceHTML } from "./components";
import { customNumberInput } from "../customNumberInput";


export const cart = wrap => {
  let sets = {};
  sets.mainBtn = dom.findFirst('.top-cart-link');

  let container = dom.getContainer(wrap);

  getCartItems()
    .then((res = {}) => {
      // console.log(res);
      // return;
      sets.coupons = res.coupons && res.coupons.length ? res.coupons : false;
      sets.cart = res.cart ? res.cart : [];
      setCartItemsPrice({ sets });

      initAddToCart({ container, sets });

      let woofContainer = dom.findFirst('#woof_results_by_ajax', container);
      if (woofContainer) {
        document.body.addEventListener('filter_reinit', e => {
          woofContainer = dom.findFirst('#woof_results_by_ajax', container);
          initAddToCart({ container: woofContainer, sets });
        });
      }

      initMainBtnCart({ sets });

      document.body.addEventListener('filter_reinit', e => {
        setAddToCartBtns({ sets });
      });

      // window.addEventListener('beforeunload', e => {
      //   sendCartContent({ sets });
      // });

      window.stroyhimCart = sets;

      // console.log(sets);

      renderCartIfUserPage({ sets });
      dom.dispatch(dom.body, 'cart_loaded');
    });
}




const renderCartIfUserPage = ({ sets }) => {
  let accountCart = dom.findFirst('#userAccountCart');
  if (!accountCart) return;

  if (!sets.cart || !sets.cart.length) {
    accountCart.innerHTML = '<h3 class="empty-account-cart">У Вас нет товаров в корзине</h3>';
    return;
  }

  let cartHTML = ModalCart({ cart: sets.cart, coupon: false, checkout: true });
  initCartEvents({ cartHTML, sets });

  accountCart.innerHTML = '';
  accountCart.appendChild(cartHTML);
}





export const getCartSets = () => {
  return window.stroyhimCart;
}







const initMainBtnCart = ({ sets }) => {
  dom.onClick(sets.mainBtn, e => {
    e.preventDefault();

    if (is_checkout()) {
      let main = dom.findFirst('.main');
      dom.scrollTo(main);
      return;
    }

    let accountCart = dom.findFirst('#userAccountCart');
    if (accountCart) {
      dom.scrollTo(userAccountCart, 70);
      return;
    }

    openCart({ sets });
  });
}




const getCartItems = () => {
  return new Promise((resolve, reject) => {
    dom.ajax({
      url: back_dates.ajax_url + '?action=vnet_shop',
      data: { fn: 'get_cart_items' }
    }).then(res => {
      res = parseResponse(res);
      // if (!res.cart) resolve([]);
      resolve(res);
    });
  });
}



const initAddToCart = ({ container, sets }) => {
  dom.onClick('.add-to-cart-prod', e => {
    e.preventDefault();
    let btn = e.currentTarget;
    if (btn.classList.contains('addeded')) {
      openCart({ btn, sets });
    } else {
      addToCart({ btn, sets });
    }
  }, container);
}



const openCart = ({ sets }) => {
  let cartHTML;
  if (!sets.cart || !sets.cart.length) {
    cartHTML = AlertModal({ msg: 'У Вас нет товаров в корзине', btn: false });
    $.fancybox.open(cartHTML, { touch: false });
    return;
  }

  cartHTML = ModalCart({ cart: sets.cart });


  initCartEvents({ cartHTML, sets });


  $.fancybox.open(cartHTML, {
    touch: false, beforeClose: () => {
      sendCartContent({ sets });
      if (is_checkout()) {
        setCartCheckoutHTML({ sets });
      }
    }
  });


}




const setCartCheckoutHTML = ({ sets }) => {
  setCartItemsPriceHTML({ cartHTML: sets.checkoutCart, sets });
  setCartItemsQuantityHTML({ cartHTML: sets.checkoutCart, sets });
}


const addToCart = ({ btn, sets }) => {
  if (isDisbledBtn({ btn })) return;
  let id = btn.dataset.id;
  if (!id) return;
  disableBtn({ btn });
  console.log(id);
  dom.ajax({
    url: back_dates.ajax_url + "?action=vnet_shop",
    data: { fn: 'add_to_cart', id: id }
  })
    .then(res => {
      // console.log(res);
      res = parseResponse(res);

      res.info.quantity = 1;
      sets.cart.push(res.info);
      dom.addClass(btn, 'addeded');

      if (res.msg) {
        let modal = AlertModal({ msg: res.msg, btn: 'openCart' });
        $.fancybox.open(modal, { touch: false, afterLoad: () => initModalOpenCart({ modal, btn, sets }) });
      }

      setMainBtnHTML({ sets });
      unDisableBtn({ btn });
    });
}



const initModalOpenCart = ({ modal, btn, sets }) => {
  if (!modal) return;
  dom.onClick('.open-cart-btn', e => {
    e.preventDefault();
    $.fancybox.close();
    openCart({ btn, sets });
  }, modal);
}



export const initCartEvents = ({ cartHTML, sets }) => {
  initSendCartBeforeCheckout({ cartHTML, sets });
  customNumberInput(cartHTML);
  setCartItemsPrice({ sets });
  setCartItemsPriceHTML({ cartHTML, sets });
  // setCartSinglePriceHTML({ cartHTML, sets });
  initChangePriceOnClick({ cartHTML, sets });
  initDeleteCartItem({ cartHTML, sets });
}


const initSendCartBeforeCheckout = ({ cartHTML, sets }) => {
  dom.onClick('.checkout-btn', e => {
    e.preventDefault();
    let btn = e.currentTarget;
    disableBtn({ btn });
    sendCartContent({ sets })
      .then(res => {
        // unDisableBtn({ btn });
        window.location.href = btn.getAttribute('href');
      })
  }, cartHTML);
}



const initChangePriceOnClick = ({ cartHTML, sets }) => {
  dom.onChange('.quantity-input', e => {
    let input = e.currentTarget;
    let val = parseInt(input.value);
    setCartItemQuantity({ id: input.dataset.id, quantity: val, input, sets });
    setCartItemsPrice({ sets });
    setCartItemsPriceHTML({ cartHTML, sets });
    dom.dispatch(dom.body, 'cart_is_change', { detail: { action: 'quantity' } });
  }, cartHTML);
}




const setCartItemQuantity = ({ id, quantity, input, sets }) => {
  sets.cart.forEach(item => {
    if (parseInt(item.id) === parseInt(id)) {
      quantity = parseInt(quantity);
      quantity = quantity > 0 ? quantity : 1;
      let max = parseInt(item.stockQuantity);
      if (max > -1 && quantity > max) {
        quantity = max;
        alertProdMaxQuantity({ prod: item });
      }
      // console.log(quantity);
      item.quantity = quantity;
      input.value = quantity;
    }
  });
}




const alertProdMaxQuantity = ({ prod }) => {
  let name = prod.name;
  let max = prod.stockQuantity;
  let msg = `${name}<br><br>Максимальное количество: ${max} шт`;
  let modal = AlertModal({ msg, btn: false });

  $.fancybox.open(modal, { touch: false });
}



const setCartItemsQuantityHTML = ({ cartHTML, sets }) => {
  let inputs = dom.findAll('.quantity-input', cartHTML);
  if (!inputs || !inputs.length) return;
  inputs.forEach(input => {
    let id = input.dataset.id;
    if (!id) return;
    let item = getCartItemById({ id, sets });
    if (!item) return;
    input.value = item.quantity;
  });
}


const setCartItemsPrice = ({ sets }) => {
  sets.cart.forEach(item => {
    item.amount = parseFloat(item.onlyPrice) * parseInt(item.quantity);
  });
}


const setCartItemsPriceHTML = ({ cartHTML, sets }) => {
  let cols = dom.findAll('.price-col', cartHTML);
  if (cols && cols.length) {
    cols.forEach(col => {
      let id = col.dataset.id;
      let cartItem = getCartItemById({ id, sets });
      if (!cartItem) return;
      let priceHTML = PriceHTML({ amount: cartItem.amount, currency: cartItem.currency });
      col.innerHTML = '';
      col.appendChild(priceHTML);

      let singlePriceCol = dom.findFirst('.single-price-col', col.parentNode);
      if (!singlePriceCol) return;
      singlePriceCol.innerHTML = '';
      singlePriceCol.appendChild(PriceHTML({ amount: cartItem.onlyPrice, currency: cartItem.currency }));
    });
  }

  let totalHTML = dom.findFirst('.total-price', cartHTML);
  if (!totalHTML) return;
  totalHTML.innerHTML = '';
  totalHTML.appendChild(PriceHTML({ amount: countTotalPrice({ sets }), currency: sets.cart[0] ? sets.cart[0].currency : '' }));
}



// const setCartSinglePriceHTML = ({ cartHTML, sets }) => {
//   let cols = dom.findAll('.single-price-col', cartHTML);
//   if (!cols || !cols.length) return;
//   cols.forEach(col => {
//     let id = col.dataset.id;
//     if (!id) return;
//     if (!cartItem) return;
//     let priceHTML = PriceHTML({ amount: cartItem.amount, currency: cartItem.currency });
//     col.innerHTML = '';
//     col.appendChild(priceHTML);
//   });
// }



const getCartItemById = ({ id, sets }) => {
  let total = sets.cart.length;
  for (let i = 0; i < total; i++) {
    if (parseInt(sets.cart[i].id) === parseInt(id)) return sets.cart[i];
  }
  return false;
}



export const countTotalPrice = ({ sets }) => {
  let total = 0;
  sets.cart.forEach(item => {
    total += item.amount;
  })
  return total;
}


const initDeleteCartItem = ({ cartHTML, sets }) => {
  dom.onClick('.rm-from-cart', e => {
    e.preventDefault();
    let btn = e.currentTarget;
    let id = btn.dataset.id;
    deleteItemFromCart({ id, sets });
    deleteItemFromCartHTML({ btn, cartHTML });
    setCartItemsPriceHTML({ cartHTML, sets });
    setCartTotalItemsHTML({ cartHTML, sets });
    setMainBtnHTML({ sets });
    setAddToCartBtns({ sets });
    dom.dispatch(dom.body, 'cart_is_change', { detail: { action: 'remove' } });
    // if (is_checkout()) window.location.href = back_dates.catalog_url;
  }, cartHTML);
}



const deleteItemFromCart = ({ id, sets }) => {
  let total = sets.cart.length;
  for (let i = 0; i < total; i++) {
    if (parseInt(sets.cart[i].id) === parseInt(id)) {
      sets.cart.splice(i, 1);
      return;
    }
  }
}



const deleteItemFromCartHTML = ({ btn, cartHTML }) => {
  dom.addClass(btn.parentNode.parentNode, 'deleted');
  let rows = dom.findAll('.cart-row:not(.deleted)', cartHTML);
  if (!rows || !rows.length) {
    $.fancybox.close();
  }
}



const setCartTotalItemsHTML = ({ cartHTML, sets }) => {
  let totalHTML = dom.findFirst('.total-prods', cartHTML);
  if (!totalHTML) return;
  totalHTML.innerHTML = sets.cart.length;
}



const setMainBtnHTML = ({ sets }) => {
  let countHTML = dom.findFirst('.count-cart', sets.mainBtn);
  countHTML.innerHTML = '';
  if (!sets.cart || !sets.cart.length) {
    dom.removeClass(sets.mainBtn, 'addeded');
    return;
  }
  countHTML.innerHTML = sets.cart.length;
  dom.addClass(sets.mainBtn, 'addeded');
}



const setAddToCartBtns = ({ sets }) => {
  let btns = dom.findAll('.add-to-cart-prod');
  if (!btns || !btns.length) return;

  let hasCart = sets.cart && sets.cart.length;

  btns.forEach(btn => {
    let id = btn.dataset.id;
    if (!id) return;
    if (hasCart) {
      if (isItemInCart({ id, sets })) {
        dom.addClass(btn, 'addeded');
      } else {
        dom.removeClass(btn, 'addeded');
      }
    } else {
      dom.removeClass(btn, 'addeded');
    }
  });
}




const isItemInCart = ({ id, sets }) => {
  let item = getCartItemById({ id, sets });
  if (!item) return false;
  return true;
}




export const sendCartContent = ({ sets, preloader }) => {
  let cart = sets.cart ? sets.cart : {};
  cart = JSON.stringify(cart);
  return new Promise((resolve, reject) => {
    dom.ajax({
      url: back_dates.ajax_url + '?action=vnet_shop',
      data: { fn: 'update_cart', cart: cart },
      preloader: preloader
    })
      .then(res => {
        resolve(res);
      });
  });
}



