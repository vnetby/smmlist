export const sliders = wrap => {
  let container = dom.getContainer(wrap);
  if (!container) return;

  let homeTopBanners = dom.findFirst('.js-home-top-banner', container);
  if (homeTopBanners) {
    initHomeTopBanners({ slider: homeTopBanners });
  }
}



const initHomeTopBanners = ({ slider }) => {
  $(slider).slick({ arrows: false });
}