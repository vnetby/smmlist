import "./style.less";

import { arrows, arrowsDestroy } from "./arrows.js";
import { dots, dotsDestroy } from "./dots.js";
import { changeSlider } from "./changeSlider.js";
import { dragSlider, dragDestroy } from "./dragSlider.js";
import { autoplay, autoplayDestroy } from "./autoplay.js";
import { dotsSlider, dotsSliderDestroy } from "./dotsSlider";

import { setTotalSlides, setSteps, setStep, setOutherSpeed, setCurrentSlides, addSlidesActiveClass, setResponsiveSets, rmSlidesActiveClass, setElementsAnimation } from "./functions.js";
import { setSliderHeight } from "./functions";
import { setHeight } from "./setHeight";

let globalSets = {
  selector: '.dom-slider',

  initOnOverflow: false,

  autoplay: false,
  autoplaySpeed: 3000,

  speed: 600,

  setHeight: false,

  vertical: false,

  arrows: true,
  appendArrows: 'slider',
  appendDots: 'slider',

  prevArrow: 'default',
  nextArrow: 'default',

  variableWidth: false,
  variableHeight: false,

  dotsHTML: 'default',
  changeOnDotHover: false,
  dots: false,

  dotsSlider: false,
  dotsSliderSets: { ...this, dotsSliderSets: null },

  draggable: true,

  animation: 'slider',

  pauseOnHover: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: true,

  infinite: false,

  beforeInit: () => { },
  afterInit: () => { },

  beforeChange: () => { },
  afterChange: () => { },

  onPause: () => { },
  onPlay: () => { }
};




export const domSlider = (wrap, argSets = {}, isDotsSlider) => {
  globalSets = Object.assign(globalSets, argSets);

  let sliders = [];
  if (!isDotsSlider) {
    let container = dom.getContainer(wrap);
    if (!container) return;

    sliders = dom.findAll(globalSets.selector, container);
    if (!sliders || !sliders.length) return;
  } else {
    sliders = [wrap];
  }


  let globalObj = {};
  globalObj.sliders = [];
  globalObj.getSliderById = getSliderById.bind(globalObj);

  sliders.forEach(slider => {
    let localSets = getLocalSets({ slider });
    let sets = { ...globalSets, ...localSets };
    if (!sets.responsive) sets.responsive = {};

    let obj = {
      slider: slider,
      sets: sets,
      defSets: { ...sets },
      responsive: { ...sets.responsive },
      domSlider: domSlider
    }

    setResponsiveSets({ obj });

    initSlider({ obj });

    obj.update = update.bind(obj);
    obj.addSlide = addSlide.bind(obj);
    obj.rmSlide = rmSlide.bind(obj);

    globalObj.sliders.push(obj);
  });

  window.domSlider = globalObj;
  return globalObj;
}



const getLocalSets = ({ slider }) => {
  let sets = {};
  if (slider.hasAttribute('data-slider-sets')) {
    try {
      sets = JSON.parse(slider.getAttribute('data-slider-sets'));
    } catch (err) {
      sets = {};
    }
  }
  return sets;
}




const initSlider = ({ obj }) => {
  let slider = obj.slider;
  let sets = obj.sets;

  obj.slides = dom.childs(slider);
  if (!obj.slides) return;

  createSliderHTML({ obj });

  setElementsAnimation({ obj });


  // setTimeout(() => {
  setSliderInititalState({ obj });

  setOnWindowResize({ obj });

  setSlideWidth({ obj });
  dom.addClass(obj.slider, 'init');
  // }, 20);

}



const setSliderInititalState = ({ obj }) => {

  setStep({ obj, step: 1 });
  let current = setCurrentSlides({ obj });

  rmSlidesActiveClass({ obj });
  addSlidesActiveClass({ slidesIds: current, obj });

  setTotalSlides({ obj, total: obj.slides.length });

  setSteps({ obj, total: obj.slides.length });

  setOutherSpeed({ obj });
  setSliderHeight({ obj });


  dragSlider({ obj });
  dots({ obj });
  dotsSlider({ obj });
  arrows({ obj });
  autoplay({ obj });
  setHeight({ obj });
}



const setOnWindowResize = ({ obj }) => {
  let fn;
  window.addEventListener('resize', e => {
    if (fn) clearTimeout(fn);
    fn = setTimeout(() => {
      let prevSets = { ...obj.sets };
      setResponsiveSets({ obj });
      realSetSlideWidth({ obj });
      changeSlider({ obj, noAnimation: true });

      if (JSON.stringify(prevSets) === JSON.stringify(obj.sets)) return;
      updateSlider({ obj });


    }, 5);
  });
}





const createSliderHTML = ({ obj }) => {
  if (obj.sets.vertical) dom.addClass(obj.slider, 'vertical-slidier');
  let outher = dom.create('div', 'slider-outher');
  let newSlides = [];
  obj.slides.map((slide, i) => {
    slide = wrapSlide(slide);
    outher.appendChild(slide);
    newSlides.push(slide);
  });
  obj.slider.innerHTML = '';
  obj.slider.appendChild(outher);
  obj.outher = outher;
  obj.slides = newSlides;
}




const wrapSlide = (slide) => {
  let div = dom.create('div', 'slide');
  div.appendChild(slide);
  return div;
}



const setSlideWidth = ({ obj }) => {
  realSetSlideWidth({ obj });
  let fn;
  window.addEventListener('resize', e => {
    if (fn) clearTimeout(fn);
    fn = setTimeout(() => {
      realSetSlideWidth({ obj });
    }, 20);
  });
}

const realSetSlideWidth = ({ obj }) => {
  if (obj.sets.variableWidth) {
    dom.addCss(obj.slides, { width: `auto` });
  } else {
    if (!obj.sets.vertical) {
      let fullWidth = obj.slider.offsetWidth;
      let width = fullWidth / obj.sets.slidesToShow;
      dom.addCss(obj.slides, { width: `${width}px` });
    } else {
      let slidesHeight = obj.slides[0].offsetHeight;
      obj.sliderHeight = slidesHeight * obj.sets.slidesToShow;
      dom.addCss(obj.slider, { height: `${obj.sliderHeight}px` });
    }
  }
}






function getSliderById(id) {
  for (let i = 0; i < this.sliders.length; i++) {
    if (this.sliders[i].slider.id === id) {
      return this.sliders[i];
    }
  }
  return false;
}




function update(sets) {
  // console.log(this);
  this.sets = { ...this.sets, ...sets };
  this.responsive = this.sets.responsive ? this.sets.responsive : {};
  this.defSets = { ...this.sets };
  // this.responsive = { ...this.sets.responive };
  realSetSlideWidth({ obj: this });
  changeSlider({ obj: this, noAnimation: true });
  setElementsAnimation({ obj: this });
  updateSlider({ obj: this });
}




function addSlide(slide) {
  if (!slide) return;
  if (typeof slide === 'string') {
    slide = dom.strToDom(slide);
  }
  slide = wrapSlide(slide);
  this.slides.push(slide);

  this.outher.appendChild(slide);

  destroySlider({ obj: this });

  setElementsAnimation({ obj: this });

  setSliderInititalState({ obj: this });

  setSlideWidth({ obj: this });
  changeSlider({ obj: this, noAnimation: true, inStart: true });
}




function rmSlide(slideId = -1) {
  if (!this.slides[slideId]) return;

  let slide = this.slides.splice(slideId, 1)[0];
  dom.remove(slide);

  destroySlider({ obj: this });

  setElementsAnimation({ obj: this });

  setSliderInititalState({ obj: this });

  setSlideWidth({ obj: this });
  changeSlider({ obj: this, noAnimation: true, inStart: true });
}




const updateSlider = ({ obj }) => {
  destroySlider({ obj });
  setSliderInititalState({ obj });
  changeSlider({ obj, noAnimation: true, inStart: true });
}


const destroySlider = ({ obj }) => {
  dragDestroy({ obj });
  dotsDestroy({ obj });
  dotsSliderDestroy({ obj });
  arrowsDestroy({ obj });
  autoplayDestroy({ obj });
}