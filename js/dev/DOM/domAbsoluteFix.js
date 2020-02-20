const EL_CLASS = 'dom-absolute-fix';


export const domAbsoluteFix = wrap => {
  let container = dom.getContainer(wrap);
  if (!container) return;

  let items = dom.findAll(`.${EL_CLASS}`, container);
  if (!items || !items.length) return;

  items.forEach(item => {
    initItem(item);
    changePosOnResize(item);
  });

}





const initItem = item => {
  dom.addCss(item, { position: 'static' });
  let parent = item.parentNode;
  let itemPosCss = item.getAttribute('data-dom-absolute-fix');

  if (!itemPosCss) {
    itemPosCss = {};
    let itemPos = dom.getStyle(item, ['top', 'right', 'bottom', 'left'], item => parseFloat(item));
    if (itemPos[0]) itemPosCss.top = itemPos[0];
    if (itemPos[1]) itemPosCss.right = itemPos[1];
    if (itemPos[2]) itemPosCss.bottom = itemPos[2];
    if (itemPos[3]) itemPosCss.left = itemPos[3];
    item.setAttribute('data-dom-absolute-fix', JSON.stringify(itemPosCss));

    dom.addClass(item, 'dom-position-fixed');
  } else {
    itemPosCss = JSON.parse(itemPosCss);
  }

  let parentOffsets = parent.getBoundingClientRect();


  for (let key in itemPosCss) {
    if (key === 'right') {
      itemPosCss[key] = parentOffsets[key] - parent.offsetWidth + itemPosCss[key];
    }
    if (key === 'left') {
      itemPosCss[key] = parentOffsets[key] + itemPosCss[key];
    }
    itemPosCss[key] = `${itemPosCss[key]}px`;
  }

  dom.addCss(item, Object.assign({ position: 'fixed' }, itemPosCss));

}




const changePosOnResize = item => {
  let width = window.innerWidth;
  window.addEventListener('resize', e => {
    let newWidth = window.innerWidth;
    if (newWidth !== width) {
      width = newWidth;
      initItem(item, true);
    }
  })
}