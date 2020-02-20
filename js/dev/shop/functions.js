const CONSOLE_RESPONSE = false;


const ACTIONS = {
  addFavorite: 'addFavorite',
  addCompare: 'addCompare'
}


export const userCan = ({ action }) => {

  if (!ACTIONS[action]) {
    throw Error(`${action} is not registered action`);
  }

  return new Promise((resolve, reject) => {
    dom.ajax({
      url: back_dates.ajax_url + '?action=vnet_shop',
      data: { fn: 'user_can', can: ACTIONS[action] }
    })
      .then(res => {
        res = parseResponse(res);
        if (isErrorResponse(res)) {
          reject(res);
        } else {
          resolve(res);
        }
      });
  });
}




export const parseResponse = res => {
  CONSOLE_RESPONSE && console.log(res);
  res = JSON.parse(res);
  if (isErrorResponse(res)) {
    throw Error(res.msg || JSON.stringify(res));
  }
  return res;
}


export const isErrorResponse = res => {
  return res.type === 'error';
}





export const isDisbledBtn = ({ btn }) => {
  return btn.classList.contains('disabled');
}

export const disableBtn = ({ btn }) => {
  dom.addClass(btn, 'disabled');
}

export const unDisableBtn = ({ btn }) => {
  dom.removeClass(btn, 'disabled');
}



export const is_checkout = () => {
  return window.location.pathname.includes('/checkout/');
}


export const is_product = () => {
  return document.body.classList.contains('.single-product');
}



export const is_user_cart_page = () => {
  let section = dom.findFirst('.user-account-cart-section');
  if (!section) return false;
  return true;
}