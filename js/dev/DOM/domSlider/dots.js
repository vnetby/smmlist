import { appendControls, getTotalSteps, getStep } from "./functions.js";
import { React } from "../domReact";
import { changeSliderTo } from "./changeSlider.js";


export const dots = ({ obj }) => {
  if (!obj.sets.dots) return;

  let dots = getDotsHTML({ obj });
  if (!dots) return;

  obj.dots = dots;
  obj.dotsBtns = getDotsBtns({ obj });




  appendControls({ item: obj.dots, wrap: obj.sets.appendDots, slider: obj.slider });

  dom.addClass(obj.slider, 'has-dots');

  let step = getStep({ obj });
  addActiveDotClass({ step, obj });
  initDots({ obj });
}


const initDots = ({ obj }) => {
  dom.onClick(obj.dotsBtns, e => {
    e.preventDefault();
    changeSliderTo({ step: parseInt(e.currentTarget.dataset.step), obj });
  });
  if (!obj.sets.changeOnDotHover) return;
  dom.onMouseenter(obj.dotsBtns, e => {
    e.preventDefault();
    changeSliderTo({ step: parseInt(e.currentTarget.dataset.step), obj });
  });
}



export const dotsDestroy = ({ obj }) => {
  if (obj.dots) dom.remove(obj.dots);
}




export const rmActiveDotsClass = ({ obj }) => {
  if (!obj.dotsBtns) return;
  dom.removeClass(obj.dotsBtns, 'active-dot');
  // let childs = dom.childs(obj.dots).forEach(dot => {
  //   if (!dot.dataset.step) return;
  //   dom.removeClass(dot, 'active-dot');
  // });
}


export const addActiveDotClass = ({ step, obj }) => {
  if (!obj.dots) return;
  let dot = dom.findFirst(`*[data-step="${step}"]`, obj.dots);
  if (dot) {
    dom.addClass(dot, 'active-dot');
  }
}


// const findDots = ({ slider, sets }) => {
//   let dots;
//   if (sets.appendDots === 'slider') {
//     return dom.findFirst('.slider-dots', slider);
//   }
//   if (dom.isDomEl(sets.appendDots)) {
//     return dom.findFirst('.slider-dots', sets.appendDots);
//   }
//   let wrap = dom.findFirst(sets.appendDots);
//   return dom.findFirst('.slider-dots', wrap);
// }






const getDotsHTML = ({ obj }) => {
  let dots;
  if (obj.sets.dotsHTML === 'default') {
    dots = (<div className="slider-dots"></div>);
  } else {
    if (typeof obj.sets.dotsHTML === 'string') {
      dots = dom.findFirst(obj.sets.dotsHTML);
      if (!dots) {
        try {
          dots = dom.strToDom(obj.sets.dotsHTML);
          dots = dom.firstChild(dots);
        } catch (err) {

        }
      }
    } else {
      dots = obj.sets.dotsHTML;
    }
    return dots;
  }
  return dots;
}


const getDotsBtns = ({ obj }) => {
  let res = [];
  if (obj.sets.dotsHTML === 'default') {
    let totalSteps = getTotalSteps({ obj });
    for (let i = 1; i <= totalSteps; i++) {
      let dot = (<button type="button" className="slide-dot" data-step={i}></button>);
      obj.dots.appendChild(dot);
      res.push(dot);
    }
  } else {
    dom.childs(obj.dots).forEach(dot => {
      if (!dot.dataset.step) return;
      res.push(dot);
    });
  }
  return res;
}