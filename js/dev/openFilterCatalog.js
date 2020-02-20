export const openFilterCatalog = wrap => {
  let container = dom.getContainer(wrap);
  let filter = dom.findFirst('.product-filter', container);
  if (!filter) return;
  dom.onClick('.open-filter-btn', e => {
    if (!isVisible({ filter })) {
      displayFilter({ filter });
    } else {
      hideFilter({ filter });
    }
  }, container);
  dom.onClick('.close-filter-btn', e => {
    if (!isVisible({ filter })) {
      displayFilter({ filter });
    } else {
      hideFilter({ filter });
    }
  }, filter);

  document.body.addEventListener('filter_reinit', e => {
    hideFilter({ filter });
    dom.scrollTo('#woof_results_by_ajax');
  });
}



const isVisible = ({ filter }) => filter.classList.contains('active');

const displayFilter = ({ filter }) => {
  dom.addClass(filter, 'active');
  dom.bodyOverflowHidden();
}

const hideFilter = ({ filter }) => {
  dom.removeClass(filter, 'active');
  dom.bodyOverflowAuto();
}