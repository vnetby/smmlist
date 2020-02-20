const BTN_CLASS = '.open-dropdown, .dropdown > a';
const DROPDOWN_CLASS = '.dropdown-content, .dropdown .sub-menu';


const ACTIVE_CLASS_BTN = 'active';
const ACTIVE_CLASS_DROPDOWN = 'active';

import "./css/domDropDown.less";


export const domDropDown = wrap => {
  let container = dom.getContainer(wrap);
  if (!container) return;
  let btns = dom.findAll(`${BTN_CLASS}`, container);


  if (!btns || !btns.length) return;



  btns.forEach(btn => {
    let drop = dom.findFirst(`${DROPDOWN_CLASS}`, btn.parentNode);
    if (!drop) return;
    let transition = dom.getStyle(drop, 'transition', item => parseFloat(item)) || 0.3;
    // drop.addEventListener('click', e => e.stopPropagation());
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      closeAllDropdown({ btns, current: btn })
      toggleDropdown(btn, false, drop, transition);
    });
  });




  dom.body.addEventListener('click', e => {
    btns.forEach(btn => {
      let drop = dom.findFirst(`${DROPDOWN_CLASS}`, btn.parentNode);
      if (!drop) return;
      let transition = dom.getStyle(drop, 'transition', item => parseFloat(item)) || 0.3;
      toggleDropdown(btn, true, drop, transition);
    });
  });


}





const closeAllDropdown = ({ btns, current }) => {
  btns.forEach(btn => {
    if (btn === current) return;
    let drop = dom.findFirst(`${DROPDOWN_CLASS}`, btn.parentNode);
    if (!drop) return;
    let transition = dom.getStyle(drop, 'transition', item => parseFloat(item)) || 0.3;
    closeDropdown(drop, transition, btn);
  });
}



const toggleDropdown = (btn, hide = false, drop, transition) => {
  if (hide) {
    if (drop.classList.contains(ACTIVE_CLASS_DROPDOWN)) {
      closeDropdown(drop, transition, btn);
    }
    return;
  }

  if (!drop.classList.contains(ACTIVE_CLASS_DROPDOWN)) {
    openDropdown(drop, transition, btn);
  } else {
    closeDropdown(drop, transition, btn);
  }

}







const openDropdown = (drop, transition, btn) => {
  dom.addCss(drop, { display: 'block', opacity: '0', transition: `${transition}s`, transform: 'translateY(-15px)' });
  dom.addClass(drop, ACTIVE_CLASS_DROPDOWN);
  dom.addClass(btn, ACTIVE_CLASS_BTN);
  setTimeout(() => {
    dom.addCss(drop, { opacity: '1', transform: 'none' });
  }, 20);
}






const closeDropdown = (drop, transition, btn) => {
  dom.addCss(drop, { opacity: '0', transform: 'translateY(-15px)' });
  dom.removeClass(btn, ACTIVE_CLASS_BTN);
  setTimeout(() => {
    dom.removeClass(drop, ACTIVE_CLASS_DROPDOWN);
    dom.removeCss(drop, ['opacity', 'transform', 'display', 'transition']);
  }, transition * 1000);
}

