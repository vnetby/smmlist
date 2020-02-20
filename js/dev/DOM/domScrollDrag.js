const CLASS_NAME = 'dom-scroll-drag';

const SPEED = 3;



export const domScrollDrag = wrap => {
  let container = dom.getContainer(wrap);
  if (!container) return;
  let items = dom.findAll(`.${CLASS_NAME}`, container);
  if (!items || !items.length) return;

  items.forEach(item => {
    initItem(item);
  });
}




const initItem = slider => {
  let isDown = false;
  let startX;
  let scrollLeft;
  slider.addEventListener('mousedown', e => mouseDown(e));
  slider.addEventListener('touchstart', e => mouseDown(e));

  slider.addEventListener('mouseleave', e => mouseLeave(e));
  // slider.addEventListener('touchend', e => mouseLeave(e));

  slider.addEventListener('mouseup', e => mouseUp(e));
  slider.addEventListener('touchend', e => mouseUp(e));

  slider.addEventListener('mousemove', e => mouseMove(e));
  slider.addEventListener('touchmove', e => mouseMove(e));



  const mouseDown = e => {
    isDown = true;
    slider.classList.add('active');
    let x = e.touches ? e.touches[0].clientX : e.pageX;
    startX = x - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  }


  const mouseLeave = e => {
    isDown = false;
    slider.classList.remove('active');
  }

  const mouseUp = e => {
    isDown = false;
    slider.classList.remove('active');
  }

  const mouseMove = e => {
    if (!isDown) return;
    e.preventDefault();
    let x = e.touches ? e.touches[0].clientX : e.pageX;
    let endX = x - slider.offsetLeft;
    const walk = (endX - startX) * 3;
    slider.scrollLeft = scrollLeft - walk / SPEED;
  }

}