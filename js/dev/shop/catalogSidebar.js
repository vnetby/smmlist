export const catalogSidebar = wrap => {
  let container = dom.getContainer(wrap);
  let sidebar = dom.findFirst('.catalog-sidebar', container);
  if (!sidebar) return;

  let titles = dom.findAll('.cat-title.has-childs', sidebar);
  if (!titles || !titles.length) return;

  let head = dom.findFirst('.sidebar-head', sidebar);
  let body = dom.findFirst('.sidebar-body', sidebar);

  setInitialState({ head, body });

  titles.forEach(title => {
    let childs = dom.findFirst('.child-cats', title.parentNode);
    initTitle({ title, sidebar, childs });
  });


  initHead({ head, body });
}




const setInitialState = ({ head, body }) => {
  // dom.removeClass(head, 'desktop-body-visible');
  if (!window.isMd()) {
    if (head.classList.contains('desktop-body-visible')) {
      dom.removeClass(head, 'desktop-body-visible');
      dom.addClass(head, 'body-visible');
      dom.removeClass(body, 'dom-slide-up');
      dom.addClass(body, 'dom-slide-down');
    }
  }

}



const initTitle = ({ title, sidebar, childs }) => {
  dom.onClick(title, e => {
    e.preventDefault();
    if (title.classList.contains('childs-visible')) {
      dom.slideUp(childs);
      dom.removeClass(title, 'childs-visible');
    } else {
      dom.slideDown(childs);
      dom.addClass(title, 'childs-visible');
    }
  });
}


const initHead = ({ head, body }) => {
  dom.onClick(head, e => {
    e.preventDefault();
    if (head.classList.contains('body-visible')) {
      dom.slideUp(body);
      dom.removeClass(head, 'body-visible');
    } else {
      dom.slideDown(body);
      dom.addClass(head, 'body-visible');
    }
  })
}