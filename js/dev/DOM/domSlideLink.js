export const domSlideLink = wrap => {
  let container = dom.getContainer(wrap);
  if (!container) return false;
  let items = dom.findAll('.slide-link', container);
  if (!items || !items.length) return;

  items.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      toggleTarget(item);
    });
  })
}






const toggleTarget = item => {
  let target = dom.findFirst(item.getAttribute('href'));
  if (!target) return;
  let slide = dom.toggleSlide(target);
  if (slide === 'slideUp') {
    dom.addClass(item, 'target-hidden');
    dom.removeClass(item, 'target-visible');
  } else {
    dom.addClass(item, 'target-visible');
    dom.removeClass(item, 'target-hidden');
  }
}