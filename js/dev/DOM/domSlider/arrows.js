import { getRealDomEl, appendControls, getCurrent, getTotalSlides, getSlidesByStep, getStep, setStep, getTotalSteps } from "./functions.js";
import { getNextStep, getPrevStep, setCurrentSlides, getCurrentSlides } from "./functions";

import { changeSlider, changeSliderTo } from "./changeSlider";

import { React } from "../domReact.js";

export const arrows = ({ obj }) => {
  if (!obj.sets.arrows) return;

  let prev, next;

  if (obj.sets.prevArrow === 'default') {
    prev = prevArrowHTML();
  } else {
    prev = getRealDomEl(dom.isDomEl(obj.sets.prevArrow) ? obj.sets.prevArrow : dom.strToDom(obj.sets.prevArrow));
  }
  if (obj.sets.nextArrow === 'default') {
    next = nextArrowHTML();
  } else {
    next = getRealDomEl(dom.isDomEl(obj.sets.nextArrow) ? obj.sets.nextArrow : dom.strToDom(obj.sets.nextArrow));
  }

  if (!prev) {
    try {
      prev = dom.findFirst(obj.sets.prevArrow);
      obj.prevArrowIsDom = true;
    } catch (err) {

    }
  }
  if (!next) {
    try {
      next = dom.findFirst(obj.sets.nextArrow);
      obj.nextArrowIsDom = true;
    } catch (err) {

    }
  }

  if (!prev || !next) return;

  let wrap = obj.sets.appendArrows;
  if (typeof wrap === 'string') {
    try {
      let el = dom.strToDom(wrap);
      let item = dom.create('div');
      item.appendChild(el);
      item = dom.firstChild(item);
      obj.slider.appendChild(item);
      wrap = item;
    } catch (err) { }
  }

  !obj.prevArrowIsDom && appendControls({ item: prev, wrap, slider: obj.slider });
  !obj.nextArrowIsDom && appendControls({ item: next, wrap, slider: obj.slider });

  obj.prevArrow = prev;
  obj.nextArrow = next;

  initPrevArrow({ obj });
  initNextArrow({ obj });

  dom.addClass(obj.slider, 'has-arrows');
}





const initPrevArrow = ({ obj }) => {
  checkDisableArrows({ obj });
  obj.prevArrow.addEventListener('click', e => {
    e.preventDefault();
    changeSliderTo({ step: getPrevStep({ obj }), obj });
    checkDisableArrows({ obj });
  });
}



const initNextArrow = ({ obj }) => {
  checkDisableArrows({ obj });
  obj.nextArrow.addEventListener('click', e => {
    e.preventDefault();
    changeSliderTo({ step: getNextStep({ obj }), obj });
    checkDisableArrows({ obj });
  });
}



export const checkDisableArrows = ({ obj }) => {
  if (obj.sets.infinite) return;
  let current = getCurrentSlides({ obj });
  let totalSlides = getTotalSlides({ obj });
  if (current[0] === 0) {
    dom.addClass(obj.prevArrow, 'disabled');
  } else {
    dom.removeClass(obj.prevArrow, 'disabled');
  }

  if (current[current.length - 1] === totalSlides - 1) {
    dom.addClass(obj.nextArrow, 'disabled');
  } else {
    dom.removeClass(obj.nextArrow, 'disabled');
  }
}




export const arrowsDestroy = ({ obj }) => {

  if (obj.nextArrow) {
    if (obj.nextArrowIsDom) {
      return;
      obj.nextArrow.parentNode.replaceChild(obj.nextArrow.cloneNode(true), obj.nextArrow);
    } else {
      dom.remove(obj.nextArrow);
    }
  }
  if (obj.prevArrow) {
    if (obj.prevArrowIsDom) {
      return;
      obj.nextArrow.prevArrow.replaceChild(obj.prevArrow.cloneNode(true), obj.prevArrow);
    } else {
      dom.remove(obj.prevArrow);
    }
  }
}





const prevArrowHTML = () => {
  return (
    <button type="button" className="slider-arrow prev-arrow">
    </button>
  );
}




const nextArrowHTML = () => {
  return (
    <button type="button" className="slider-arrow next-arrow">
    </button>
  );
}


