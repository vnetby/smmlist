import { parseResponse, is_checkout } from "./functions.js";
import { AlertModal, ModalCart, TotalAmountCoupon, CheckoutReview, EmptyCartHTML } from "./components";


import { getCartSets, initCartEvents, countTotalPrice, sendCartContent } from "./cart";

import { thankyouPage } from "./thankyouPage";

const VALIDATE_FORM = true;



export const checkout = () => {
  if (!is_checkout()) return;
  let main = dom.findFirst('.main');

  dom.addPreloader(main);

  dom.body.addEventListener('cart_loaded', e => {
    let sets = getCartSets();
    // endCheckout({ sets });

    if (!sets.cart || !sets.cart.length) {
      displayEmptyCartContent();
      dom.removePreloader(main);
      return;
    }

    sets.checkoutCart = dom.findFirst('#checkoutCart');
    if (!sets.checkoutCart) return;

    applyCoupon({ sets });

    initCartCheckout({ sets });
    initCoupon({ sets });

    initShip({ sets });
    initPay({ sets });
    initTypeClient({ sets });

    initCheckoutReview({ sets });

    initRemoveErrorInputs({ sets });

    dom.body.addEventListener('cart_is_change', e => {
      if (e.detail && e.detail.action && e.detail.action === 'remove') {
        sendCartContent({ sets });
      }
      if (!sets.cart || !sets.cart.length) {
        displayEmptyCartContent();
        return;
      }
      applyCoupon({ sets });
      initCheckoutReview({ sets });
    });

    removeInload();
    // setTimeout(() => {
    // endCheckout({ sets });
    // }, 1000);
    dom.removePreloader(main);
  });
}





const initRemoveErrorInputs = ({ sets }) => {
  let inputs = dom.findAll('.input', dom.findFirst('.main'));
  if (!inputs || !inputs.length) return;
  dom.onChange(inputs, e => {
    dom.removeClass(e.currentTarget, 'has-error');
  });
}


const displayEmptyCartContent = () => {
  let wrap = dom.findFirst('.main-cols');
  wrap.innerHTML = '';
  let html = EmptyCartHTML();
  wrap.appendChild(html);
}




const removeInload = () => {
  dom.removeClass('.in-load', 'in-load');
}




const initPay = ({ sets }) => {
  sets.paySelect = dom.findFirst('#payMethods');
  sets.payHelp = dom.findFirst('.pay-help');

  let labels = JSON.parse(sets.paySelect.dataset.labels);
  sets.payMethod = { [sets.paySelect.value]: labels[sets.paySelect.value] };

  sets.paySelect.addEventListener('nice-change', e => {

    sets.payMethod = { [e.currentTarget.value]: labels[e.currentTarget.value] };

    applyCoupon({ sets });
    initCheckoutReview({ sets });

    setPayDescription({ sets });
  });

  setPayDescription({ sets });
}



const setPayDescription = ({ sets }) => {
  let items = dom.findAll('.pay-help-content', sets.payHelp);
  if (!items || !items.length) return;

  let current = dom.findFirst(`.pay-help-${Object.keys(sets.payMethod)[0]}`, sets.payHelp);
  if (!current) return;

  dom.removeClass(items, 'visible');
  dom.addClass(current, 'visible');
}



const initShip = ({ sets }) => {
  sets.deliveryForm = dom.findFirst('#deliveryForm');
  sets.shipBtns = dom.findAll('.ship-btn');
  sets.shipPrices = {};

  let shipMethods = dom.findFirst('#shipMethodsPrices');
  sets.shipPrices = JSON.parse(shipMethods.dataset.prices);
  sets.pickupAddress = JSON.parse(shipMethods.dataset.pickupAddress);
  // initDeliveryCityChange({ sets });
  sets.shipBtns.forEach(btn => {
    if (btn.classList.contains('active')) {
      sets.shipMethod = { [btn.dataset.key]: btn.innerHTML };
      sets.shipType = btn.dataset.type;
    }
  });

  dom.onClick(sets.shipBtns, e => {
    e.preventDefault();
    dom.removeClass(sets.shipBtns, 'active');
    dom.addClass(e.currentTarget, 'active');

    sets.shipMethod = { [e.currentTarget.dataset.key]: e.currentTarget.innerHTML };
    sets.shipType = e.currentTarget.dataset.type;

    if (sets.shipType === 'delivery') {
      openDeliveryForm({ sets });
    } else {
      closeDeliveryForm({ sets });
    }
    calcShipping({ sets });
    initCheckoutReview({ sets });
  });
}




const calcShipping = ({ sets }) => {

  if (!sets.shipMethod) return;

  let shipKey = Object.keys(sets.shipMethod)[0];
  sets.shipAmount = sets.shipPrices[shipKey] ? parseFloat(sets.shipPrices[shipKey]) : 0;
  // let method = Object.keys(sets.shipMethod)[0];
  // if (method === 'pickup') return;

  // if (method === 'delivery') {
  //   let input = dom.findFirst('#deliveryCity', sets.deliveryForm);
  //   if (!input) return;
  //   let val = input.value;
  //   val = val.replace(/[\s]+/, '');
  //   val = val.toLowerCase();

  //   if (val === 'минск' || val === 'minsk') {
  //     sets.shipAmount = sets.shipPrices.minsk ? parseFloat(sets.shipPrices.minsk) : 0;
  //     return;
  //   }
  //   sets.shipAmount = sets.shipPrices.region ? parseFloat(sets.shipPrices.region) : 0;
  // }

}


const initDeliveryCityChange = ({ sets }) => {
  let cityInput = dom.findFirst('#deliveryCity', sets.deliveryForm);
  cityInput.addEventListener('change', e => {
    calcShipping({ sets });
    initCheckoutReview({ sets });
  });
}



const openDeliveryForm = ({ sets }) => {
  dom.slideDown(sets.deliveryForm);
}

const closeDeliveryForm = ({ sets }) => {
  dom.slideUp(sets.deliveryForm);
}


const initCartCheckout = ({ sets, fns }) => {
  let cartHTML = ModalCart({ cart: sets.cart, coupon: true, checkout: true });
  initCartEvents({ cartHTML, sets });
  sets.checkoutCart.appendChild(cartHTML);
}





export const initCheckoutReview = ({ sets }) => {
  sets.checkoutReview = dom.findFirst('#checkoutReview');
  sets.checkoutReview.innerHTML = '';

  let shipKey = Object.keys(sets.shipMethod)[0];
  let shipMethod = sets.shipMethod[shipKey];
  let payMethod = sets.payMethod[Object.keys(sets.payMethod)[0]];
  let typeClient = sets.typeClient[Object.keys(sets.typeClient)[0]];

  let shipAmount = sets.shipPrices[shipKey];
  let pickupAddress = sets.pickupAddress[shipKey];

  let html = CheckoutReview({
    total: calcRealPrice({ sets }),
    currency: sets.cart[0].currency,
    totalProds: sets.cart.length,
    shipMethod,
    payMethod,
    totalDiscount: sets.totalDiscount,
    coupons: sets.coupons,
    typeClient: typeClient,
    shipAmount: shipAmount,
    pickupAddress: pickupAddress
  });

  sets.checkoutReview.appendChild(html);
  initDeleteCoupon({ sets });
  initSendOrder({ html, sets });
}



const initSendOrder = ({ html, sets }) => {
  let btns = dom.findAll('.send-order-btn', html);
  if (!btns || !btns.length) return;
  dom.onClick(btns, e => {
    e.preventDefault();
    dom.addPreloader('.main');
    if (VALIDATE_FORM) {
      let valid = validateForms({ sets });
      if (!valid) return;
    }
    completeOrder({ sets });
  });
}


const validateForms = ({ sets }) => {
  let valid = true;
  if (sets.shipType === 'delivery') {
    valid = validateDeliveryForm({ sets });
    if (!valid) {
      alertValidateError();
      return false;
    }
  }
  valid = validateContactsForm({ sets });
  if (!valid) {
    alertValidateError();
    return false;
  }
  return true;
}



const alertValidateError = () => {
  let modal = AlertModal({ msg: 'Проверьте правильность заполненных полей', btn: false });
  $.fancybox.open(modal, { touch: false });
  dom.removePreloader('.main');
}




const validateContactsForm = ({ sets }) => {
  let form = dom.findFirst('.contacts-form');
  if (!form) return;
  let inputs = dom.findAll('.input', form);
  if (!inputs || !inputs.length) return;
  let errors = [];
  inputs.forEach(input => {
    if (!validateInput({ input })) {
      errors.push(input);
    }
  });
  if (!errors.length) return true;
  return false;
}



const validateDeliveryForm = ({ sets }) => {
  let form = dom.findFirst('#deliveryForm');
  if (!form) return;
  let inputs = dom.findAll('.input', form);
  if (!inputs || !inputs.length) return;
  let errors = [];
  inputs.forEach(input => {
    if (!validateInput({ input })) {
      errors.push(input);
    }
  });
  if (!errors.length) return true;
  return false;
}



const validateInput = ({ input }) => {
  if (input.required) {
    if (!input.value) {
      dom.addClass(input, 'has-error');
      return false;
    }
  }

  return true;
}



const initDeleteCoupon = ({ sets }) => {
  dom.onClick('.delete-coupon', e => {
    e.preventDefault();
    let coupon = e.currentTarget.dataset.id;
    dom.addPreloader('.main');
    dom.ajax({
      url: back_dates.ajax_url + '?action=vnet_shop',
      data: { fn: 'delete_coupon', coupon: coupon }
    })
      .then(res => {
        deleteCouponFromSets({ sets, coupon });
        applyCoupon({ sets });
        initCheckoutReview({ sets });
        dom.removePreloader('.main');
      });
  }, sets.checkoutReview);
}



const deleteCouponFromSets = ({ sets, coupon }) => {
  if (!sets.coupons || !sets.coupons.length) return;
  let total = sets.coupons.length;
  for (let i = 0; i < total; i++) {
    if (sets.coupons[i].post_title === coupon) {
      sets.coupons.splice(i, 1);
      return;
    }
  }
}



const initCoupon = ({ sets }) => {
  let cartHTML = sets.checkoutCart;

  let btn = dom.findFirst('.apply-coupon', cartHTML);
  if (!btn) return;
  let input = dom.findFirst('.coupon-input', cartHTML);
  if (!input) return;
  dom.onClick(btn, e => {
    e.preventDefault();
    if (!input.value) return;
    dom.addPreloader('.main');
    sendCartContent({ sets })
      .then(() => sendCoupon({ sets, coupon: input.value }));
  });
}


const sendCoupon = ({ sets, coupon }) => {
  if (!coupon) return;
  dom.ajax({
    url: back_dates.ajax_url + '?action=vnet_shop',
    data: { fn: 'apply_coupon', coupon: coupon }
  })
    .then(res => {
      res = parseResponse(res);
      let modal = AlertModal({ msg: res.msg, btn: false });
      $.fancybox.open(modal, { touch: false });
      if (res.applied) {
        if (!sets.coupons) sets.coupons = [];
        sets.coupons.push(res.coupon);
        applyCoupon({ sets });
        initCheckoutReview({ sets });
        dom.removePreloader('.main');
      }
    })
}



const applyCoupon = ({ sets }) => {
  setTotalDiscount({ sets });
  let wrap = dom.findFirst('#totalWithCoupon');
  wrap.innerHTML = '';
  if (!sets.totalDiscount) return;

  let amount = calcAmountWithDiscount({ sets });
  let totalHTML = TotalAmountCoupon({ amount, currency: sets.cart[0].currency });
  if (wrap) wrap.appendChild(totalHTML);
}



const setTotalDiscount = ({ sets }) => {
  let totalDiscount = 0;
  if (sets.coupons && sets.coupons.length) {
    sets.coupons.forEach(coupon => {
      let type = coupon.details.discount_type;
      let amount = parseFloat(coupon.details.coupon_amount);
      let couponAmount = 0;

      if (type === 'fixed_product') {
        sets.cart.forEach(item => {
          couponAmount += parseInt(item.quantity) * amount;
        });
      }

      if (type === 'percent') {
        let total = countTotalPrice({ sets });
        couponAmount = amount * total / 100;
      }

      if (type === 'fixed_cart') {
        couponAmount = amount;
      }

      coupon.totalDiscount = couponAmount.toFixed(2);
      totalDiscount += couponAmount;
    });
  }
  sets.totalDiscount = totalDiscount ? totalDiscount.toFixed(2) : 0;
}


const calcAmountWithDiscount = ({ sets }) => {
  return (countTotalPrice({ sets }) - sets.totalDiscount).toFixed(2);
}




export const calcRealPrice = ({ sets }) => {
  let total = countTotalPrice({ sets });
  if (sets.totalDiscount) {
    total -= parseFloat(sets.totalDiscount);
  }
  if (sets.shipAmount) {
    total += sets.shipAmount;
  }
  return total.toFixed(2);
}





const initTypeClient = ({ sets }) => {
  let select = dom.findFirst('#typeClient');
  if (!select) return;
  sets.typeClientSelect = select;
  sets.typeClientLabels = JSON.parse(select.dataset.labels);
  sets.typeClient = { [select.value]: sets.typeClientLabels[select.value] };
  select.addEventListener('nice-change', e => {
    sets.typeClient = { [select.value]: sets.typeClientLabels[select.value] };
    initCheckoutReview({ sets });
  });
}




const completeOrder = ({ sets }) => {
  sendCartContent({ sets })
    .then(() => saveOrder({ sets }))
    .then(res => {
      // console.log(res);
      // dom.removePreloader('.main');
      // return;
      res = parseResponse(res);
      if (res.errorMsg) {
        let modal = AlertModal({ msg: res.errorMsg, btn: false });
        $.fancybox.open(modal, { touch: false });
        console.log(res.errorMsg);
        dom.removePreloader('.main');
        return;
      }
      // console.log(res);
      if (res.order) sets.orderId = res.order;

      if (res.action && res.action === 'endCheckout') {
        endCheckout({ sets });
      } else {
        dom.removePreloader('.main');
      }
    });
}




const endCheckout = ({ sets }) => {
  let mainCols = dom.findFirst('.main-cols');
  let thankyou = thankyouPage({ sets });
  // mainCols.innerHTML = '';
  mainCols.parentNode.replaceChild(thankyou, mainCols);
  // mainCols.appendChild(thankyou);

  dom.removePreloader('.main');
}


const saveOrder = ({ sets }) => {
  let res = {};
  res.shipMethod = Object.keys(sets.shipMethod)[0];
  res.payMethod = Object.keys(sets.payMethod)[0];
  res.typeClient = Object.keys(sets.typeClient)[0];
  res.shipType = sets.shipType;
  // res.coupons = sets.coupons;
  // res.cart = sets.cart;

  res.infoContacts = getInfoContacts({ res });

  if (sets.shipType === 'delivery') {
    res.infoDelivery = getInfoDelivery({ res });
  }

  return new Promise((resolve, reject) => {
    dom.ajax({
      url: back_dates.ajax_url + '?action=vnet_shop',
      data: { fn: 'save_order', info: JSON.stringify(res) }
    })
      .then(res => {
        resolve(res);
      });
  });

}






const getInfoContacts = ({ res }) => {
  let form = dom.findFirst('.contacts-form');
  if (!form) return false;

  let inputs = dom.findAll('.input', form);
  if (!inputs || !inputs.length) return false;

  let result = {};
  inputs.forEach(input => result[input.name] = input.value);
  return result;
}





const getInfoDelivery = ({ res }) => {
  let form = dom.findFirst('#deliveryForm');
  if (!form) return false;

  let inputs = dom.findAll('.input', form);
  if (!inputs || !inputs.length) return false;

  let result = {};
  inputs.forEach(input => result[input.name] = input.value);
  return result;
}