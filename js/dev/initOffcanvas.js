export const initOffcanvas = wrap => {
  let openBtn = dom.findFirst('.open-offcanvas', wrap);
  if (!openBtn) return;

  let menu = dom.findFirst('.offcanvas-menu', wrap);
  if (!menu) return;

  let closeBtn = dom.findFirst('.close-offcanvas', wrap);
  if (!closeBtn) return;

  let overlay = dom.findFirst('.offcanvas-overlay');
  initOverlay({ overlay, openBtn, menu, closeBtn });

  init({ openBtn, menu, closeBtn });
}


const init = ({ openBtn, menu, closeBtn }) => {
  dom.onClick([openBtn, closeBtn], e => {
    e.preventDefault();
    if (isVisible({ menu })) {
      closeMenu({ menu });
    } else {
      openMenu({ menu });
    }
  });
}




const initOverlay = ({ overlay, openBtn, menu, closeBtn }) => {
  dom.onClick(overlay, e => {
    e.preventDefault();
    if (isVisible({ menu })) {
      closeMenu({ menu });
    }
  })
}



const isVisible = ({ menu }) => {
  return menu.classList.contains('active');
}

const closeMenu = ({ menu }) => {
  dom.bodyOverflowAuto();
  dom.removeClass(dom.body, 'offcanvas-visible');
  dom.removeClass(menu, 'active');
}

const openMenu = ({ menu }) => {
  dom.bodyOverflowHidden();
  dom.addClass(dom.body, 'offcanvas-visible');
  dom.addClass(menu, 'active');
}