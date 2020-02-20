import { getCurrentSlides, rmSlidesActiveClass, addSlidesActiveClass, getSlidesByStep, setCurrentSlides, setStep, setOutherSpeed, getStep, getPrevStep, getNextStep, getPrevSlides, getTranslate } from "./functions";
import { rmActiveDotsClass, addActiveDotClass } from "./dots.js";
import { setSliderHeight } from "./functions";
import { checkDisableArrows } from "./arrows";

export const changeSliderTo = ({ step, obj }) => {

  if (step === getStep({ obj })) {
    if (obj.sets.animation !== 'slider') return;
  }

  if (obj.inAnimation) {
    return;
  }
  obj.inAnimation = true;

  rmSlidesActiveClass({ obj });
  if (obj.sets.dots) rmActiveDotsClass({ obj });

  let currentSlides = getSlidesByStep({ obj, step });

  obj.sets.beforeChange({ currentSlides: getCurrentSlides({ obj }).map(index => obj.slides[index]), nextSlides: currentSlides.map(index => obj.slides[index]) });

  setStep({ obj, step });

  addSlidesActiveClass({ slidesIds: currentSlides, obj });

  if (obj.sets.dots) addActiveDotClass({ step, obj });

  obj.sets.afterChange({ prevSlides: getCurrentSlides({ obj }).map(index => obj.slides[index]), currentSlides: currentSlides.map(index => obj.slides[index]) });

  setCurrentSlides({ obj });
  changeSlider({ obj });
}



export const changeSlider = ({ obj, noAnimation, after, inStart }) => {
  checkDisableArrows({ obj });
  setSliderHeight({ obj });
  if (noAnimation) {
    dom.addCss(obj.outher, { 'transition-duration': '0s' });
    let translate = inStart ? 0 : getNextTranslate({ obj });
    translateOuther({ obj, translate });
    if (after) after();
    setTimeout(() => {
      setOutherSpeed({ obj });
    }, 20);
    return;
  }

  switch (obj.sets.animation) {
    case 'slide':
      slideSlider({ obj });
      break;
    case 'fade':
      fadeSlider({ obj });
      break;
    case 'animate':
      animateSlider({ obj });
      break;
    case 'data-animate':
      dataAnimateSlider({ obj });
      break;
    default:
      slideSlider({ obj });
      break;
  }
}






const dataAnimateSlider = ({ obj }) => {
  if (!obj.animate) return;
  obj.inAnimation = false;
  let speed = obj.sets.speed / 2;
  obj.animate.forEach(item => {
    dom.removeClass(item.el, `${item.animateOut.join(' ')} ${item.animateIn.join(' ')} animated`);
    dom.removeCss(item.el, ['animation-delay', 'animation-duration', 'animation-fill-mode']);

    item.animations = item.animations ? item.animations : [];
    if (item.animations.length) {
      item.animations.forEach(anim => clearTimeout(anim));
      item.animations = [];
    }

    dom.addCss(item.el, { 'animation-delay': `${item.delayOut / 1000}s`, 'animation-duration': `${item.durationOut / 1000}s` });
    let animation = getAnimation({ animationIn: item.animateIn, animationOut: item.animateOut });
    dom.addClass(item.el, `${animation[0]} animated`);
    item.animations.push(setTimeout(() => {
      let translate = getNextTranslate({ obj });
      translateOuther({ obj, translate });

      dom.removeClass(item.el, `${item.animateOut.join(' ')} animated`);

      dom.addCss(item.el, { 'animation-delay': `${item.delayIn / 1000}s`, 'animation-duration': `${item.durationIn / 1000}s` });
      dom.addClass(item.el, `${animation[1]} animated`);

      item.animations.push(setTimeout(() => {
        dom.removeCss(item.el, ['animation-delay', 'animation-duration']);
        dom.removeClass(item.el, `${item.animateIn.join(' ')} animated`);
        item.animations = [];
      }, speed + item.delayIn));

    }, speed + item.delayOut));
  });
}



const slideSlider = ({ obj }) => {
  obj.inAnimation = false;
  let translate = getNextTranslate({ obj });
  translateOuther({ obj, translate });
}



const animateSlider = ({ obj }) => {
  obj.inAnimation = false;

  let animateItems = obj.sets.animationItem ? dom.findAll(obj.sets.animationItem, obj.slides) : obj.slides;

  let speed = obj.sets.speed / 2;

  let animationOut = getAnimationValues(obj.sets.animationOut);
  let animationIn = getAnimationValues(obj.sets.animationIn);
  let animation = getAnimation({ animationIn, animationOut });

  clearTimeout(obj.animateCssTimeoutOut);
  clearTimeout(obj.animateCssTimeoutIn);

  dom.removeClass(animateItems, `${animationOut.join(' ')} ${animationIn.join(' ')} animated`);

  dom.addClass(animateItems, `${animation[0]} animated`);

  obj.animateCssTimeoutOut = setTimeout(() => {

    let translate = getNextTranslate({ obj });
    translateOuther({ obj, translate });
    dom.removeClass(animateItems, `${animationOut.join(' ')} animated`);
    dom.addClass(animateItems, `${animation[1]} animated`);

    obj.animateCssTimeoutIn = setTimeout(() => {
      obj.animateCssTimeoutOut = false;
      obj.animateCssTimeoutIn = false;
      dom.removeClass(animateItems, `${animationIn.join(' ')} animated`);
    }, speed);


  }, speed);

}



const fadeSlider = ({ obj }) => {
  obj.inAnimation = false;

  let speed = parseFloat(obj.sets.speed) / 2 / 1000;
  let translate = getNextTranslate({ obj });

  dom.addCss(obj.outher, { 'opacity': '0' });

  clearTimeout(obj.fadeAnimationIn);
  clearTimeout(obj.fadeAnimationOut);

  obj.fadeAnimationOut = setTimeout(() => {
    dom.addCss(obj.outher, { 'transition-duration': `${0}s` });
    translateOuther({ obj, translate });

    obj.fadeAnimationIn = setTimeout(() => {
      setOutherSpeed({ obj });
      dom.addCss(obj.outher, { 'opacity': 1 });
    }, 20);
  }, speed * 1000);
}



const translateOuther = ({ obj, translate }) => {
  obj.outher.dataset.translate = translate;
  if (!obj.sets.vertical) {
    dom.addCss(obj.outher, { transform: `translateX(${translate}px)` });
  } else {
    dom.addCss(obj.outher, { transform: `translateY(${translate}px)` });
  }
}



const getNextTranslate = ({ obj }) => {
  let current = getCurrentSlides({ obj });
  let toShow = parseFloat(obj.sets.slidesToShow);
  let div = toShow < 1 ? toShow : 1;

  if (!obj.sets.vertical) {
    let widthBefore = 0;

    for (let i = 0; i < current[0]; i++) {
      widthBefore += obj.slides[i].offsetWidth * div;
    }
    return -widthBefore;
  } else {
    let heightBefore = 0;
    for (let i = 0; i < current[0]; i++) {
      heightBefore += obj.slides[i].offsetHeight * div;
    }
    return -heightBefore;
  }

}




const getAnimationValues = (item) => {
  item = typeof item === 'string' ? [item] : item;
  if (typeof item !== 'object' || !item.length) return [''];
  return item;
}


const getAnimation = ({ animationIn, animationOut }) => {
  let res = [];

  let index = Math.floor(Math.random() * animationIn.length);
  res[1] = animationIn[index];
  res[0] = animationOut[index] ? animationOut[index] : animationOut[Math.floor(Math.random() * animationOut.length)];

  return res;
}
