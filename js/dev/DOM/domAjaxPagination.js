const PAGINATION_CLASS = 'dom-ajax-pagination';
const SET_URL = true;


export const domAjaxPagination = (wrap, reload = false) => {
  let container = dom.getContainer(wrap);

  let paginations = dom.findAll(`.${PAGINATION_CLASS}`, container);
  if (!paginations || !paginations.length) return;

  if (SET_URL && !reload) setContentBack();

  paginations.forEach(pag => {
    initPagination(pag, container);
  });

}




const initPagination = (pag, wrapper) => {
  let links = dom.findAll('[data-page]', pag);
  if (!links || !links.length) return;

  let container = dom.findFirst(pag.dataset.content);
  if (!container) return;


  let ajaxUrl = pag.dataset.ajax;

  if (!ajaxUrl) return;

  // if (SET_URL) setInitialState({ links, ajaxUrl, containerId: pag.dataset.content });

  links.forEach(link => {

    link.addEventListener('click', e => {
      e.preventDefault();
      if (link.hasAttribute('data-page-current') || link.classList.contains('load-page')) return;
      dom.addClass(link, 'load-page');
      let pageNum = link.dataset.page;
      let pageTitle = link.dataset.title;
      let pageLink = link.getAttribute('href');
      if (!pageLink) return;

      sendRequest({ pageNum, containerId: pag.dataset.content, ajaxUrl, pageTitle, pageLink });
    });

  });

}





const setInitialState = ({ links, ajaxUrl, containerId }) => {
  let total = links.length;
  for (let i = 0; i < total; i++) {
    let link = links[i];
    if (!link.hasAttribute('data-page-current')) continue;
    let pageTitle = link.dataset.title;
    let pageNum = link.dataset.page;
    let pageLink = link.dataset.pageLink;
    if (!pageLink) return;
    setUrl({ pageNum, containerId, ajaxUrl, pageTitle, pageLink });
  }
}


const sendRequest = ({ pageNum, containerId, ajaxUrl, pageTitle, pageLink, reload }) => {
  dom.ajax({
    url: ajaxUrl,
    data: { page: pageNum },
    preloader: containerId,
    timeout: 0,
    minTimeResponse: 300
  })
    .then(res => {
      if (res) {
        let container = dom.findFirst(containerId);
        container.innerHTML = res;
        domAjaxPagination(container.parentNode, true);
        if (SET_URL && !reload) setUrl({ pageNum, containerId, ajaxUrl, pageTitle, pageLink });
      }
    });
}




const setUrl = ({ pageNum, containerId, ajaxUrl, pageTitle, pageLink }) => {
  if (ajaxUrl) {
    window.history.pushState({ domAjaxPagination: true, pageNum, containerId, ajaxUrl, pageTitle, pageLink }, pageTitle ? pageTitle : null, pageLink);
    if (pageTitle) {
      document.title = pageTitle;
    }
  }
}




const setContentBack = () => {
  window.addEventListener('popstate', e => {
    if (!e.state || !e.state.domAjaxPagination) window.location.href = window.location.href;
    sendRequest({
      pageNum: e.state.pageNum,
      containerId: e.state.containerId,
      ajaxUrl: e.state.ajaxUrl,
      pageTitle: e.state.pageTitle,
      pageLink: e.state.pageLink,
      reload: true
    });
  });
}