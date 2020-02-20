import "./css/domOpenModal.less";
import { React } from "./domReact.js";
const BTN_CLASS = 'dom-open-modal';
const BTN_ACTIVE_CLASS = 'active';
const MODAL_ACTIVE_CLASS = 'active';


export const domOpenModal = wrap => {
  let container = dom.getContainer(wrap);
  if (!container) return;

  let btns = dom.findAll(`.${BTN_CLASS}`, container);

  if (!btns || !btns.length) return;

  btns.forEach(btn => {
    let id = btn.dataset.target;
    let target = dom.findFirst(id);
    console.log(id);
    if (!target) return;
    btn.addEventListener('click', e => {
      e.preventDefault();
      initBtn(btn, target);
    });
  });
}






const initBtn = (btn, target) => {
  if (!btn.classList.contains(BTN_ACTIVE_CLASS)) {
    showModal(btn, target);
  } else {
    hideModal(btn, target);
  }
}




const showModal = (btn, target) => {
  dom.dispatch(dom.body, 'stop_hide_menu');
  let close = dom.findFirst('.close-modal-btn', target);

  if (!close) {
    let closeBtn = createCloseBtn();
    target.appendChild(closeBtn);
    close = dom.findFirst('.close-modal-btn', target);
    initCloseModal(close, btn, target);
  }

  dom.bodyOverflowHidden();
  dom.addClass(btn, BTN_ACTIVE_CLASS);
  dom.addClass(target, MODAL_ACTIVE_CLASS);
}




const hideModal = (btn, target) => {
  dom.dispatch(dom.body, 'start_hide_menu');
  dom.bodyOverflowAuto();
  dom.removeClass(btn, BTN_ACTIVE_CLASS);
  dom.removeClass(target, MODAL_ACTIVE_CLASS);
}





const initCloseModal = (close, btn, target) => {
  close.addEventListener('click', e => {
    e.preventDefault();
    hideModal(btn, target);
  });
}





const createCloseBtn = () => {
  return (
    <div className="close-modal-btn">
      <div class="hamburger hamburger--slider js-hamburger is-active">
        <div class="hamburger-box">
          <div class="hamburger-inner"></div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="close-modal-btn">
      <a href="#" class="close-button">
        <div class="in">
          <div class="close-button-block"></div>
          <div class="close-button-block"></div>
        </div>
        <div class="out">
          <div class="close-button-block"></div>
          <div class="close-button-block"></div>
        </div>
      </a>
    </div>
  );
}