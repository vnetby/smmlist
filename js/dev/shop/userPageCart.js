import { is_user_cart_page } from "./functions.js";
import { getCartSets, initCartEvents, countTotalPrice, sendCartContent } from "./cart";



export const userPageCart = wrap => {
  if (!is_user_cart_page()) return;

  document.body.addEventListener('cart_loaded', e => {
    init();
  });
}




const init = () => {
  let sets = getCartSets();

  dom.body.addEventListener('cart_is_change', e => {
    if (e.detail && e.detail.action && e.detail.action === 'remove') {
      sendCartContent({ sets });
    }
    if (!sets.cart || !sets.cart.length) {
      displayEmptyCartContent();
      return;
    }
  });

  initComleteOrder({ sets });
}





const displayEmptyCartContent = () => {
  let section = dom.findFirst('.user-account-cart-section');
  section.innerHTML = '';
  // section.appendChild(())
}





const initComleteOrder = ({ sets }) => {
  let container = dom.findFirst('#userAccountCart');
  if (!container) return;

  let btn = dom.findFirst('.checkout-btn', container);
  if (!btn) return;

  dom.onClick(btn, e => {
    e.preventDefault();

    dom.addPreloader(container);
    sendCartContent({ sets })
      .then(res => {
        dom.removePreloader(container);
        window.location.href = btn.getAttribute('href');
      });
  });

}