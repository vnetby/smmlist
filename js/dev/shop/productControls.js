import { userCan, parseResponse, isDisbledBtn, disableBtn, unDisableBtn } from "./functions.js";
import { AlertModal, ConfirmModal } from "./components";


const ADD_FAVORITE = '.control-cart-btn.add-pref';
const ADD_COMPARE = '.control-cart-btn.add-compare';
const RM_LOOP_CARD = '.js-rm-loop-card';



export const productControls = (wrap, checkWindowObject = false) => {

  if (!window.productControls) {
    window.productControls = { favorite: [], compare: [] };
  }

  let container = dom.getContainer(wrap);

  let addFavorite = dom.findAll(ADD_FAVORITE, container);
  if (addFavorite && addFavorite.length) {
    initFavorite({ btns: addFavorite });
    // checkIfInWindowObject('favorite', btns);
  }

  let addCompare = dom.findAll(ADD_COMPARE, container);
  if (addCompare && addCompare.length) {
    initCompare({ btns: addCompare });
    // checkIfInWindowObject('compare', btns);
  }


  let rmLoopCard = dom.findAll(RM_LOOP_CARD, container);
  if (rmLoopCard && rmLoopCard.length) {
    initRmLoopCard({ btns: rmLoopCard });
  }

}





const initRmLoopCard = ({ btns }) => {
  dom.onClick(btns, e => {
    e.preventDefault();
    let btn = e.currentTarget;
    let id = btn.dataset.id;
    let action = btn.dataset.action;
    let confirm = btn.dataset.confirm;
    if (confirm) {
      alertConfirmModal({ msg: confirm, onConfirm: () => rmLoopCard({ id, action }), onReject: null });
    } else {
      rmLoopCard({ id, action });
    }
  });
}




const alertConfirmModal = ({ msg, onConfirm, onReject }) => {
  let modal = ConfirmModal({ msg });
  dom.onClick('.js-confirm-btn', e => {
    e.preventDefault();
    onConfirm && onConfirm();
    $.fancybox.close();
  }, modal);
  dom.onClick('.js-reject-btn', e => {
    e.preventDefault();
    onReject && onReject();
    $.fancybox.close();
  }, modal);
  $.fancybox.open(modal, { touch: false });
}




const rmLoopCard = ({ id, action }) => {
  dom.addPreloader('.main');
  dom.ajax({
    url: back_dates.ajax_url + '?action=vnet_shop',
    data: { fn: action, id: id }
  }).then(res => {
    res = parseResponse(res);
    dom.removePreloader('.main');
    if (res.reload) {
      window.location.href = window.location.href;
    }
  });
}




const initFavorite = ({ btns }) => {

  dom.onClick(btns, e => {
    e.preventDefault();
    let btn = e.currentTarget;

    if (isDisbledBtn({ btn })) return;
    if (btn.classList.contains('addeded')) {
      removeFromFavorite({ btn });
      return;
    }

    disableBtn({ btn });

    userCan({ action: 'addFavorite' }).then(res => {
      if (!res.can) {
        let modal = AlertModal({ msg: res.msg });
        $.fancybox.open(modal, { touch: false });
        unDisableBtn({ btn });
      } else {
        addToFavorite({ btn });
      }
    });
  });
}

const addToFavorite = ({ btn }) => {
  let id = parseInt(btn.dataset.id);
  if (!id) return;
  dom.ajax({
    url: back_dates.ajax_url + '?action=vnet_shop',
    data: { fn: 'add_to_favorite', id: id }
  }).then(res => {
    res = parseResponse(res);
    dom.addClass(btn, 'addeded');
    unDisableBtn({ btn });

    addToWindowObject('favorite', id);
  });
}




const removeFromFavorite = ({ btn }) => {
  let id = parseInt(btn.dataset.id);
  if (!id) return;
  disableBtn({ btn });
  dom.ajax({
    url: back_dates.ajax_url + '?action=vnet_shop',
    data: { fn: 'remove_from_favorite', id: id }
  }).then(res => {
    res = parseResponse(res);
    dom.removeClass(btn, 'addeded');
    unDisableBtn({ btn });

    rmFromWindowObject('favorite', id);

    // reload page if it is page of favorite products
    if (document.querySelector('.favorite-list')) {
      window.location.href = window.location.href;
    }
  });
}




const initCompare = ({ btns }) => {
  dom.onClick(btns, e => {
    e.preventDefault();
    let btn = e.currentTarget;
    if (isDisbledBtn({ btn })) return;
    let id = parseInt(btn.dataset.id);
    if (!id) return;
    disableBtn({ btn });
    userCan({ action: 'addCompare' })
      .then(res => {
        if (!res.can) {
          let modal = AlertModal({ msg: res.msg });
          $.fancybox.open(modal, { touch: false });
          unDisableBtn({ btn });
        } else {
          if (btn.classList.contains('addeded')) {
            removeFromCompare({ btn, id });
          } else {
            addToCompare({ btn, id });
          }
        }
      });
  });
}


const removeFromCompare = ({ btn, id }) => {
  dom.ajax({
    url: back_dates.ajax_url + '?action=vnet_shop',
    data: { fn: 'remove_from_compare', id: id }
  }).then(res => {
    res = parseResponse(res);
    dom.removeClass(btn, 'addeded');
    unDisableBtn({ btn });

    // if user page compare
    if (document.querySelector('.compare-list')) {
      window.location.href = window.location.href;
    }
    rmFromWindowObject('compare', id);
  });
}

const addToCompare = ({ btn, id }) => {
  dom.ajax({
    url: back_dates.ajax_url + '?action=vnet_shop',
    data: { fn: 'add_to_compare', id: id }
  }).then(res => {
    res = parseResponse(res);
    dom.addClass(btn, 'addeded');
    unDisableBtn({ btn });

    addToWindowObject('compare', id);
  });
}









const addToWindowObject = (key, id) => {
  let pos = window.productControls[key].indexOf(id);
  if (pos === -1) {
    window.productControls[key].push(id);
  }
}





const rmFromWindowObject = (key, id) => {
  let pos = window.productControls[key].indexOf(id);
  if (pos > -1) {
    window.productControls[key].splice(pos, 1);
  }
}





const checkIfInWindowObject = (key, btns) => {
  // if (!)
}