export const getRealDomEl = (el) => {
  if (typeof el !== 'object') return false;
  if (el.tagName) return el;
  let div = dom.create('div');
  div.appendChild(el);
  el = dom.firstChild(div);
  return el.tagName ? el : false;
}





export const appendControls = ({ item, wrap, slider }) => {
  if (dom.isDomEl(wrap)) {
    wrap.appendChild(item);
  } else {
    if (wrap === 'slider') {
      slider.appendChild(item);
    } else {
      try {
        let el = dom.findFirst(wrap);
        el.appendChild(item);
      } catch (err) {
        slider.appendChild(item);
      }
    }
  }
}




export const getTotalSlides = ({ obj }) => {
  return parseInt(obj.totalSlides);
  // return parseInt(obj.slider.dataset.total);
}
export const setTotalSlides = ({ obj, total }) => {
  obj.totalSlides = total;
  // obj.slider.setAttribute('data-total', total);
}

export const setCurrentSlides = ({ obj }) => {
  let step = getStep({ obj });
  let slides = getSlidesByStep({ obj, step });
  let prevSlides;
  if (!obj.currentSlides) {
    let prevStep = getPrevStep({ obj });
    prevSlides = getSlidesByStep({ obj, step: prevStep });
  } else {
    prevSlides = [...obj.currentSlides];
  }
  obj.prevSlides = prevSlides;
  obj.currentSlides = slides;
  return slides;
}

export const getCurrentSlides = ({ obj }) => {
  return obj.currentSlides;
  return obj.slider.dataset.currentSlides.split(',').map(item => parseInt(item));
}


export const getPrevSlides = ({ obj }) => {
  return obj.prevSlides;
}




export const setSteps = ({ obj, total }) => {
  total = total - obj.sets.slidesToShow;
  let steps = Math.ceil(total / obj.sets.slidesToScroll) + 1;
  obj.totalSteps = steps;
  // obj.slider.dataset.steps = steps;
}

export const setStep = ({ obj, step }) => {
  obj.currentStep = step;
  // obj.slider.setAttribute('data-current-step', step);
}

export const getStep = ({ obj }) => {
  return parseInt(obj.currentStep);
  // return parseInt(obj.slider.getAttribute('data-current-step'));
}

export const getTotalSteps = ({ obj }) => {
  return parseInt(obj.totalSteps);
  // return parseInt(obj.slider.getAttribute('data-steps'));
}



export const getSlidesByStep = ({ obj, step }) => {
  let res = [];
  // console.log(obj.sets);
  let slidesToShow = parseFloat(obj.sets.slidesToShow);
  let slidesToScroll = parseFloat(obj.sets.slidesToScroll);

  if (step === 1) {
    for (let i = 0; i < slidesToShow; i++) {
      res.push(i);
    }
    return res;
  }

  step = step - 1;
  let total = getTotalSlides({ obj });

  let firstIndex = step * slidesToScroll + slidesToShow - slidesToScroll;
  if (slidesToScroll < slidesToShow) {
    let diffSlides = slidesToShow - slidesToScroll;
    firstIndex = firstIndex - diffSlides;
  }
  if (firstIndex + slidesToScroll > total - 1 && slidesToScroll < slidesToShow) {
    firstIndex = total - 1 - slidesToScroll;
  }
  let lastIndex = firstIndex + slidesToShow > total ? total : firstIndex + slidesToShow;


  for (let i = firstIndex; i < lastIndex; i++) {
    res.push(i);
  }

  return res;
}



export const getNextStep = ({ obj }) => {
  let step = getStep({ obj });
  let totalSteps = getTotalSteps({ obj });
  if (step + 1 <= totalSteps) return step + 1;
  if (!obj.sets.infinite) return step;
  return 1;
}


export const getPrevStep = ({ obj }) => {
  let step = getStep({ obj });
  let totalSteps = getTotalSteps({ obj });
  if (step - 1 > 0) return step - 1;
  if (!obj.sets.infinite) return step;
  return totalSteps;
}



export const setOutherSpeed = ({ obj }) => {
  if (obj.sets.animation === 'slider') {
    dom.addCss(obj.outher, { 'transition-duration': `${parseFloat(obj.sets.speed) / 1000}s` });
    return;
  }
  if (obj.sets.animation === 'fade') {
    let speed = parseFloat(obj.sets.speed) / 2 / 1000;
    dom.addCss(obj.outher, { 'transition-duration': `${speed}s` });
    return;
  }
  dom.addCss(obj.outher, { 'transition-duration': `${0}s` });
}




export const setElementsAnimation = ({ obj }) => {
  if (obj.sets.animation === 'animate') {
    obj.slides.map(item => dom.addCss(item, { 'animation-duration': `${obj.sets.speed / 2 / 1000}s` }));
    return;
  }
  if (obj.sets.animation === 'data-animate') {
    let animate = dom.findAll('.slider-animate', obj.slides);
    if (!animate || !animate.length) return;
    let defDuration = obj.sets.speed / 2;

    obj.animate = animate.map(el => {
      return {
        el: el,
        delayIn: getElAnimationDelayIn({ el, def: 0 }),
        delayOut: getElAnimationDelayOut({ el, def: 0 }),
        animateIn: getElAnimationIn({ el }),
        animateOut: getElAnimationOut({ el }),
        durationIn: getElAnimationDurationIn({ el, def: defDuration }),
        durationOut: getElAnimationDurationOut({ el, def: defDuration })
        // animations: []
      }
    });
    return;
  }
}



const getElAnimationDurationIn = ({ el, def }) => {
  if (el.dataset.animationDurationIn) return parseFloat(el.dataset.animationDurationIn);
  if (el.dataset.animationDuration) return parseFloat(el.dataset.animationDuration);
  return parseFloat(def);
}
const getElAnimationDurationOut = ({ el, def }) => {
  if (el.dataset.animationDurationOut) return parseFloat(el.dataset.animationDurationOut);
  if (el.dataset.animationDuration) return parseFloat(el.dataset.animationDuration);
  return parseFloat(def);
}

const getElAnimationDelayIn = ({ el, def }) => {
  if (el.dataset.animationDelayIn) return parseFloat(el.dataset.animationDelayIn);
  if (el.dataset.animationDelay) return parseFloat(el.dataset.animationDelay);
  return parseFloat(def);
}
const getElAnimationDelayOut = ({ el, def }) => {
  if (el.dataset.animationDelayOut) return parseFloat(el.dataset.animationDelayOut);
  if (el.dataset.animationDelay) return parseFloat(el.dataset.animationDelay);
  return parseFloat(def);
}

const getElAnimationIn = ({ el }) => {
  return el.dataset.animationIn ? el.dataset.animationIn.split(',').map(item => item.replace(/ /g, '')) : ['no-animation'];
}
const getElAnimationOut = ({ el }) => {
  return el.dataset.animationOut ? el.dataset.animationOut.split(',').map(item => item.replace(/ /g, '')) : ['no-animation'];
}


export const rmSlidesActiveClass = ({ obj }) => {
  dom.removeClass(obj.slides, 'current-slide');
}


export const addSlidesActiveClass = ({ slidesIds, obj }) => {
  slidesIds.forEach(id => {
    dom.addClass(obj.slides[id], 'current-slide');
  })
}




export const setResponsiveSets = ({ obj }) => {

  let width = window.innerWidth;
  let breakpoints = Object.keys(obj.responsive).map(key => key !== 'def' && parseFloat(key)).sort((a, b) => b < a);
  let current = 'def';

  for (let i = 0; i < breakpoints.length; i++) {
    if (width <= breakpoints[i]) {
      current = breakpoints[i].toString();
      break
    }
  }

  if (current === 'def') {
    obj.sets = { ...obj.defSets }
  } else {
    obj.sets = { ...obj.defSets, ...obj.responsive[current] }
  }
}





export const getTranslate = ({ obj }) => {
  return obj.outher.dataset.translate ? parseFloat(obj.outher.dataset.translate) : 0;
}





export const setSliderHeight = ({ obj }) => {
  if (!obj.sets.variableHeight) {
    if (!obj.sets.vertical) {
      dom.addCss(obj.slider, { height: 'auto' });
    } else {
      dom.addCss(obj.slider, { height: `${obj.sliderHeight}px` });
    }
  } else {
    dom.addClass(obj.slider, 'variable-height');
    let height = 0;
    obj.slides.filter((slide, i) => obj.currentSlides.indexOf(i) !== -1).forEach(slide => {
      if (slide.offsetHeight > height) height = slide.offsetHeight;
    });
    dom.addCss(obj.slider, { 'height': `${height}px` });
  }
}