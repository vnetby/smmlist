import { productControls } from "./productControls";

export const productsFilter = wrap => {
  let container = dom.getContainer(wrap);
  let filter = dom.findFirst('.product-filter', container);
  if (!filter) return;

  let filterTopBar = dom.findFirst('.filter-top-bar', container);

  initResetTerm({ filter });
  catalogSetStyleDisplayProds({ filterTopBar });

  let niceSelects = initNiceSelect({ filterTopBar });

  initCheckBoxEvents({ filter });
  initTooltip({ filter });

  initCollapseFilterElements({ filter });

  document.body.addEventListener('filter_reinit', e => {
    // console.log(e);
    initResetTerm({ filter });
    initCheckBoxEvents({ filter });

    productControls(dom.findFirst('#woof_results_by_ajax', container), true);

    initCollapseFilterElements({ filter });
  });

  document.body.addEventListener('filter_reset', e => {
    niceSelects.update();
  });
}




const initResetTerm = ({ filter }) => {
  let btns = dom.findAll('.woof_radio_term_reset', filter);
  if (!btns || !btns.length) return;


  dom.onClick(btns, e => {
    e.preventDefault();
    let name = e.currentTarget.dataset.name;
    let input = dom.findFirst(`input[name="${name}"]`, e.currentTarget.parentNode);
    if (!input) return;
    if (input.checked) input.checked = false;
  });
}




const catalogSetStyleDisplayProds = ({ filterTopBar }) => {
  if (!filterTopBar) return;

  let btns = dom.findAll('.view-set-btn', filterTopBar);
  if (!btns || !btns.length) return;

  dom.onClick(btns, e => {
    e.preventDefault();
    dom.removeClass(btns, 'active');
    dom.addClass(e.currentTarget, 'active');
    let view = e.currentTarget.dataset.view;

    dom.removeClass(document.body, 'view-grid view-list');
    dom.addClass(document.body, `view-${view}`);
  });
}



const initNiceSelect = ({ filterTopBar }) => {
  if (!filterTopBar) return;

  let selects = dom.findAll('select', filterTopBar);
  let $selects = $(selects);

  $selects.niceSelect();
  
  return {
    update: () => {
      $selects.niceSelect('update');
    }
  }
}





const initTooltip = ({ filter }) => {
  let tooltip = dom.findFirst('.product-filter-tooltip', filter);
  if (!tooltip) return;

  let sets = {};
  // hideTooltip({ tooltip, sets });
  dom.onClick('.reset-btn', e => {
    hideTooltip({ tooltip, sets });
  }, tooltip);

  dom.onClick('.filter-btn', e => {
    applyFilter({ filter, tooltip, sets });
  }, tooltip)


  document.body.addEventListener('filter_change', e => {
    if (!e.detail || !e.detail.item) return;
    hideTooltip({ tooltip, sets, container: e.detail.item });
    setTooltipValue({ tooltip })
      .then(() => {
        showTooltip({ container: e.detail.item, tooltip: tooltip, sets });
      });
  });
}







const hideTooltip = ({ tooltip, sets, container }) => {
  if (container && sets.visible === container) return;

  let realTooltip = dom.findFirst('.tooltip', tooltip);
  if (!realTooltip) return;
  resetTooltip({ tooltip: realTooltip, sets });
  sets.visible = false;
  dom.addClass(realTooltip, 'fadeOutRight animated');
  sets.hideAnimation = setTimeout(() => {
    dom.removeClass(realTooltip, 'fadeOutRight animated');
    dom.addCss(realTooltip, { display: 'none' });
  }, 300);
}


const showTooltip = ({ container, tooltip, sets }) => {
  if (sets.visible === container) return;

  let realTooltip = dom.findFirst('.tooltip', tooltip);
  if (!realTooltip) return;
  resetTooltip({ tooltip: realTooltip, sets });

  sets.visible = container;

  dom.addCss(realTooltip, { top: `${container.offsetTop}px` });

  dom.addClass(realTooltip, 'fadeInRight animated');
  dom.addCss(realTooltip, { display: 'flex' });
  sets.showAnimation = setTimeout(() => {
    dom.removeClass(realTooltip, 'fadeInRight animated');
  }, 300);
}


const resetTooltip = ({ tooltip, sets }) => {
  dom.removeClass(tooltip, 'fadeOutRight fadeInRight animated');
  clearTimeout(sets.hideAnimation);
  clearTimeout(sets.showAnimation);
}

const applyFilter = ({ filter, tooltip, sets }) => {
  let realBtn = dom.findFirst('.woof_submit_search_form', filter);
  if (!realBtn) return;
  hideTooltip({ tooltip, sets })
  dom.dispath(realBtn, 'click');
}



const setTooltipValue = ({ tooltip }) => {
  return new Promise((resolve, reject) => {
    let data = { ...woof_current_values, link: woof_get_submit_link(), shortcode: $('#woof_results_by_ajax').data('shortcode') };
    let localCount = getLocalCountFilterProducts({ data });
    let countDom = dom.findFirst('.count', tooltip);
    if (!countDom) return;

    if (localCount !== false) {
      countDom.innerHTML = localCount;
      resolve();
    } else {
      dom.ajax({
        url: back_dates.ajax_url + '?action=get_count_prods_new_filter',
        data: data
      })
        .then(res => {
          let count = res ? res : 0;
          countDom.innerHTML = count;
          setLocalCountFilterProducts({ data, count });
          resolve();
        });
    }
  });
}


const getLocalCountFilterProducts = ({ data }) => {
  let local = window.localStorage.getItem('product_count_filter');
  if (!local) return false;
  local = JSON.parse(local);

  data = JSON.stringify(data);

  let total = local.length;

  for (let i = 0; i < total; i++) {
    if (local[i][0] === data) {
      return local[i][1];
    }
  }

  return false;
}


const setLocalCountFilterProducts = ({ data, count }) => {
  let local = window.localStorage.getItem('product_count_filter');
  if (!local) {
    local = [];
  } else {
    local = JSON.parse(local);
  }

  data = JSON.stringify(data);

  let total = local.length;

  for (let i = 0; i < total; i++) {

    if (local[i][0] === data) {
      local[i][1] = count;
      window.localStorage.setItem('product_count_filter', JSON.stringify(local));
      return;
    }
  }

  local.push([data, count]);
  window.localStorage.setItem('product_count_filter', JSON.stringify(local));
}



const initCheckBoxEvents = ({ filter }) => {
  let containers = dom.findAll('.woof_container', filter);
  if (!containers || !containers.length) return;

  containers.forEach(item => {
    let checkBoxes = dom.findAll('.woof_checkbox_term', item);
    if (!checkBoxes || !checkBoxes.length) return;
    dom.onChange(checkBoxes, e => {
      dom.dispath(dom.body, 'filter_change', { detail: { item } });
    });
  });
}





const initCollapseFilterElements = ({ filter }) => {
  dom.onClick('.filter-block-head.collapse-btn', e => {
    e.preventDefault();
    let btn = e.currentTarget;
    let target = dom.findFirst('.woof_block_html_items', btn.parentNode);
    if (!target) return;
    // console.log(btn);
    dom.toggleSlide(target);
    // if (target.classList.contains('woof_closed_block')) {
    //   dom.slideDown(target);
    //   dom.removeClass(target, 'woof_closed_block');
    // } else {
    //   dom.slideDown(target);
    //   dom.addClass(target, 'woof_closed_block');
    // }
  }, filter);
}