const ITEM_CLASS = 'dom-parallax-bg';
const BACKGROUND_ATTR = 'data-background';
const SETS_ATTR = 'data-parallax-sets';

import simpleParallax from 'simple-parallax-js';
import "./css/domParallaxBg.less";


export const domParallaxBg = wrap => {
  let container = dom.getContainer(wrap);
  if (!container) return;

  let items = dom.findAll(`.${ITEM_CLASS}`, container);
  if (!items || !items.length) return;

  items.forEach(item => {
    init({ item });
  })
}




const init = ({ item }) => {
  let src = item.getAttribute(BACKGROUND_ATTR);
  if (!src) return;

  let sets = item.getAttribute(SETS_ATTR);
  if (sets) {
    sets = JSON.parse(sets);
  } else {
    sets = {};
  }

  let img = new Image;
  img.src = src;
  item.insertBefore(img, item.firstChild);
  new simpleParallax(img, sets);
}