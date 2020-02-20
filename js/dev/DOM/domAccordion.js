import "./css/domAccordion.less";

const ACCORDION_CLASS = 'dom-accordion';
const HEAD_CLASS = 'accordion-head';
const BODY_CLASS = 'accordion-body';



const HEAD_ACTIVE_CLASS = 'active';


export const domAccordion = wrap => {
  let container = dom.getContainer(wrap);
  if (!container) return;

  let items = dom.findAll(`.${ACCORDION_CLASS}`, container);

  if (!items || !items.length) return;

  items.forEach(item => {
    initAccordion(item);
  });
}





const initAccordion = container => {
  let btns = dom.findAll(`.${HEAD_CLASS}`, container);
  if (!btns || !btns.length) return;
  btns.forEach(btn => {
    let target = dom.findFirst(`.${BODY_CLASS}`, btn.parentNode);
    btn.addEventListener('click', e => {
      e.preventDefault();
      initBtn(btn, target, btns);
    })
  });
}





const initBtn = (btn, target, btns) => {
  if (!btn || !target || !btns.length) return;
  if (btn.classList.contains(HEAD_ACTIVE_CLASS)) {
    btn.classList.remove(HEAD_ACTIVE_CLASS);
    dom.slideUp(target);
  } else {
    btn.classList.add(HEAD_ACTIVE_CLASS);
    slideUpAll(btns, btn);
    dom.slideDown(target);
  }
}






const slideUpAll = (btns, btn) => {
  btns.forEach(item => {
    if (item === btn) return;
    dom.removeClass(item, HEAD_ACTIVE_CLASS);
    let target = dom.findFirst(`.${BODY_CLASS}`, item.parentNode);
    dom.slideUp(target);
  });
}