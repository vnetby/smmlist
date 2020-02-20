const ITEM_CLASS = 'dom-filtering';
const LINK_ACTIVE_CLASS = 'active';
const TIMER = 400;



export const domFiltering = wrap => {
  let container = dom.getContainer(wrap);
  if (!container) return;

  let items = dom.findAll(`.${ITEM_CLASS}`, container);
  if (!items || !items.length) return;

  let filterContainer = dom.findFirst('.filter-container', container);
  if (!filterContainer) return;
  items.forEach((item, i) => {
    init({ item, filterContainer });
  });

}





const init = ({ item, filterContainer }) => {
  let links = dom.findAll('.filter-link', item);
  if (!links || !links.length) return;
  let items = dom.findAll('.filter-item', item);
  if (!items || !items.length) return;


  links.forEach((link) => {
    link.addEventListener('click', e => {
      e.preventDefault();
      dom.removeClass(filterContainer, 'start-timer');

      if (link.classList.contains(LINK_ACTIVE_CLASS)) return;
      let display = link.dataset.display;
      if (!display) return;


      removeAllActiveLinks({ links, link });
      addActiveLink({ link });
      
      if (window.filterHideTimer) {
        clearTimeout(window.filterHideTimer);
      }
      
      hideAllItems({ items, display, filterContainer });

      window.filterHideTimer = setTimeout(() => {
        items.forEach(item => {
          dom.addCss(item, { display: 'none' });
        });
        showAllItems({ items, display, filterContainer });
      }, TIMER);

    });
  });
}







const hideAllItems = ({ items, display, filterContainer }) => {
  
  dom.css(filterContainer, { height: filterContainer.offsetHeight + 'px' });

  let offsets = [];

  items.forEach((item, i) => {
    let top = item.offsetTop;
    let left = item.offsetLeft;
    dom.removeClass(item, 'last-item');
    dom.removeClass(item, 'first-item');
    dom.removeClass(item, 'current-item');
    offsets.push({
      item: item,
      top: top + 'px',
      left: left + 'px'
    });
  });


  offsets.forEach(item => {
    dom.css(item.item, {
      position: 'absolute',
      left: item.left,
      top: item.top
    });
    dom.addClass(item.item, 'hide-filter');
  });



}



const showAllItems = ({ items, display, filterContainer }) => {
  
  let containerInitialHeight = filterContainer.offsetHeight;


  let passedItems = [];
  items.forEach((item, i) => {

    let itemDisplay = item.dataset.display;
    if (!itemDisplay) return;
    
    if (itemDisplay === display || display === 'all') {
      item.removeAttribute('style');
      dom.addClass(item, 'current-item');
      passedItems.push(item);
    }

  });
  dom.addClass(passedItems[passedItems.length - 1], 'last-item');
  dom.addClass(passedItems[0], 'first-item');
  setTimeout(() => {
    passedItems.forEach(item => {
      dom.removeClass(item, 'hide-filter');
    });
  }, 20);



  setTimeout(() => {
    filterContainer.removeAttribute('style');

    let newHeight = filterContainer.offsetHeight;

    filterContainer.style.height = containerInitialHeight + 'px';

    setTimeout(() => {
      if (window.filterContainerHeightTimer) {
        clearTimeout(window.filterContainerHeightTimer);
      }
      filterContainer.style.height = newHeight + 'px';
      dom.addClass(filterContainer, 'start-timer');
      window.filterContainerHeightTimer = setTimeout(() => {
        if (filterContainer.classList.contains('start-timer')) {
          filterContainer.style.height = 'auto';
          dom.removeClass(filterContainer, 'start-timer');
        }
      }, TIMER);


    }, 20);

  }, 21);


}







const removeAllActiveLinks = ({ links, link }) => {
  links.forEach((item, i) => {
    if (item === link) return;
    dom.removeClass(item, LINK_ACTIVE_CLASS);
  });
}





const addActiveLink = ({ link }) => {
  dom.addClass(link, LINK_ACTIVE_CLASS);
}



