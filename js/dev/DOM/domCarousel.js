import "./css/domCarouselCore.less";
import "./css/domCarouselTheme.less";

// import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm';
import Glide from '@glidejs/glide';

const CAROUSEL_CLASS = 'dom-carousel';

const BREAKPOINTS_RULES = {

};

const ONLY_MOBILE = true;

const SETS_ATTR = 'carousel-sets';
const TABLET_ATTR = 'carousel-tablet';
const MOBILE_ATTR = 'carousel-mobile';

/*
*       BASED ON NATIVE CAROUSE
*       DOCUMENTATION: https://glidejs.com/docs/
*/



export const domCarousel = wrap => {
  let container = dom.getContainer(wrap);
  if (!container) return;
  let items = dom.findAll(`.${CAROUSEL_CLASS}`);
  if (!items || !items.length) return;

  // Breakpoints.match(BREAKPOINTS_RULES);

  items.forEach(item => {

    let sets = dom.getDomAttr(item, SETS_ATTR);

    if (sets) {
      sets = JSON.parse(sets);
    } else {
      sets = {};
    }
    item.setAttribute('dom-plugin', 'dom-carousel');

    if (dom.hasDomAttr(item, TABLET_ATTR)) {
      if (window.isMobile() || window.isTablet()) {
        let glide = new Glide(item, sets).mount();
        displayTablet(item, sets, glide);
      } else {
        displayTablet(item, sets);
      }
      return;
    }

    if (dom.hasDomAttr(item, MOBILE_ATTR)) {
      if (window.isMobile()) {
        let glide = new Glide(item, sets).mount();
        displayMobile(item, sets, glide);
      } else {
        displayMobile(item, sets);
      }
      return;
    }

    new Glide(item, sets).mount();
  });

}





const displayTablet = (item, sets, glid) => {
  let current = getCurrentMarkup();

  window.addEventListener('resize', () => {
    let mark = getCurrentMarkup();
    if (mark === current) return;
    current = mark;

    if (current === 'desktop' && glid) {
      glid.destroy();
      glid = null;
    }

    if ((current === 'tablet' || current === 'mobile') && !glid) {
      glid = new Glide(item, sets).mount();
    }
  });

}





const displayMobile = (item, sets, glid) => {

  let current = getCurrentMarkup();

  window.addEventListener('resize', () => {
    let mark = getCurrentMarkup();

    if (mark === current) return;

    current = mark;

    if (current !== 'mobile' && glid) glid.destroy();

    if (current === 'mobile' && !glid) {
      glid = new Glide(item, sets).mount();
    }
  });

}




const getCurrentMarkup = () => {
  if (window.isTablet()) return 'tablet';
  if (window.isMobile()) return 'mobile';
  if (window.isDesktop()) return 'desktop';
}
