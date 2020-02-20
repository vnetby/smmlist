
export const dropDownMenu = wrap => {
  let container = dom.getContainer(wrap);

  let header = dom.findFirst('.header', container);
  init({ container: header });

  let offcanvas = dom.findFirst('.offcanvas-menu', container);
  init({ container: offcanvas, slide: true });
}


const init = ({ container, slide }) => {
  if (!container) return;

  let links = dom.findAll('.menu-item.dropdown', container);
  if (!links || !links.length) return;

  links.forEach(dropdown => {
    initLink({ dropdown, slide });
    initSubMenu({ dropdown, slide });
    initSlide({ dropdown, slide });
  });
}



const initSlide = ({ dropdown, slide }) => {

  if (!slide) return;

  dom.removeClass(dropdown, 'dropdown');

  let link = dom.findFirst('.slide-link', dropdown);
  if (!link) return;

  let menu = dom.findFirst('.sub-menu', dropdown);
  if (!menu) return;

  dom.onClick(link, e => {
    e.preventDefault();
    dom.toggleSlide(menu);
  });
}




const initSubMenu = ({ dropdown, slide }) => {
  if (!dropdown) return;
  let menu = dom.findFirst('.sub-menu', dropdown);
  if (!menu) return;
  addMenuClasses({ menu, slide });
}


const initLink = ({ dropdown, slide }) => {
  if (!dropdown) return;
  let link = dom.findFirst('a', dropdown);
  if (!link) return;
  appendArrow({ link });
  addLinkClasses({ link, slide });
  preventClick({ link });
}



const appendArrow = ({ link }) => {
  let div = document.createElement('div');
  div.innerHTML = `
  <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.492188H10L5 6.23833L0 0.492188Z" fill="#393939"></path>
  </svg>
  `;
  let svg = dom.findFirst('svg', div);
  link.appendChild(svg);
}


const preventClick = ({ link }) => {
  dom.onClick(link, e => e.preventDefault());
}


const addLinkClasses = ({ link, slide }) => {
  if (!slide) {
    dom.addClass(link, 'open-dropdown has-arrow');
  } else {
    dom.addClass(link, 'slide-link has-arrow');
  }
}


const addMenuClasses = ({ menu, slide }) => {
  if (!slide) {
    dom.addClass(menu, 'dropdown-content');
  } else {
    dom.addClass(menu, 'dom-slide-up');
  }
}