import { getNextStep, getPrevStep, getStep, setStep, getSlidesByStep, setOutherSpeed, setCurrentSlides } from "./functions";
import { changeSlider, changeSliderTo } from "./changeSlider";

const MIN_CHANGE = 80;
const MIN_DRAG = 7;


// let countDrag = 0;

export const dragSlider = ({ obj }) => {

  let click = false;
  let startX = 0;
  let startY = 0;
  let prevMove = false;
  let endX = 0;
  let endY = 0;

  let countMove = 0;

  obj.dragEv = {};

  obj.dragEv.mouseDown = mouseDown;
  obj.dragEv.mouseLeave = mouseLeave;
  obj.dragEv.mouseUp = mouseUp;
  obj.dragEv.mouseMove = mouseMove;

  obj.dragEv.preventDrag = preventDrag;


  if (obj.sets.draggable) {
    dom.addClass(obj.outher, 'draggable');

    obj.outher.addEventListener('dragstart', obj.dragEv.preventDrag);

    obj.outher.addEventListener('mousedown', obj.dragEv.mouseDown);

    obj.outher.addEventListener('mouseup', obj.dragEv.mouseUp);

    obj.outher.addEventListener('mouseleave', obj.dragEv.mouseLeave);

    obj.outher.addEventListener('mousemove', obj.dragEv.mouseMove);
  }


  if (obj.sets.swipe) {
    obj.outher.addEventListener('touchstart', obj.dragEv.mouseDown);

    obj.outher.addEventListener('touchend', obj.dragEv.mouseUp);

    obj.outher.addEventListener('touchmove', obj.dragEv.mouseMove);
  }





  function mouseDown(e) {
    let ev = e.type === 'touchstart' ? e.changedTouches[0] : e;
    startX = ev.screenX;
    startY = ev.screenY;
    click = true;
    dom.addClass(obj.outher, 'in-drag');
    dom.addCss(obj.outher, { 'transition-duration': '0s' })
  }


  function mouseLeave(e) {
    if (!click) return;
    click = false;
    endX = 0;
    endY = 0;
    prevMove = false;
    startX = 0;
    startY = 0;
    countMove = 0;
    dom.removeClass(obj.outher, 'in-drag');
    setOutherSpeed({ obj });
    changeSlider({ obj, noAnimation: obj.sets.animation !== 'slider' });
  }



  function mouseUp(e) {
    let ev = e.type === 'touchend' ? e.changedTouches[0] : e;

    endX = ev.screenX;
    endY = ev.screenY;

    click = false;
    prevMove = false;
    countMove = 0;

    dom.removeClass(obj.outher, 'in-drag');
    setOutherSpeed({ obj });

    let diffX = startX - endX;
    let diffY = startY - endY;

    let angleX = Math.atan(Math.abs(startY - endY) / Math.abs(startX - endX));

    startX = 0;
    endX = 0;

    startY = 0;
    endY = 0;


    if (!obj.sets.vertical && Math.abs(diffX) < 10) return;
    if (obj.sets.vertical && Math.abs(diffY) < 10) return;

    // console.log(angleX, angleX < 0.5);

    if (!obj.sets.vertical && angleX > 0.5) {
      changeSliderTo({ obj, step: getStep({ obj }) });
      return;
    }

    if (obj.sets.vertical && angleX < 0.5) {
      changeSliderTo({ obj, step: getStep({ obj }) });
      return;
    }

    let step = getStep({ obj });
    if (diffX < 0) {
      step = getPrevStep({ obj });
    } else {
      step = getNextStep({ obj })
    }
    changeSliderTo({ step, obj });
  }




  function mouseMove(e) {


    if (countMove < MIN_DRAG) {
      if (click) {
        countMove++;
      }
      return;
    }

    let moveAnimations = ['slider'];

    if (!click || moveAnimations.indexOf(obj.sets.animation) === -1) return;
    let ev = e.type === 'touchmove' ? e.changedTouches[0] : e;

    let step;

    if (obj.sets.vertical) {
      step = prevMove === false ? 1 : prevMove - ev.clientY;

    } else {
      step = prevMove === false ? 1 : prevMove - ev.clientX;
    }

    prevMove = obj.sets.vertical ? ev.clientY : ev.clientX;


    moveOuther({ obj, step });
  }



  function preventDrag(e) {
    if (e.target !== obj.outher) {
      e.preventDefault();
    }
  }

}



const moveOuther = ({ obj, step }) => {
  let currentTranslate = obj.outher.dataset.translate ? parseFloat(obj.outher.dataset.translate) : 0;
  let translate = currentTranslate - step;
  if (!obj.sets.vertical) {
    dom.addCss(obj.outher, { 'transform': `translateX(${translate}px)` });
  } else {
    dom.addCss(obj.outher, { 'transform': `translateY(${translate}px)` });
  }
  obj.outher.dataset.translate = translate;
}




export const dragDestroy = ({ obj }) => {
  if (!obj.dragEv) return;
  dom.removeClass(obj.outher, 'draggable in-drag');
  obj.outher.removeEventListener('mousedown', obj.dragEv.mouseDown);
  obj.outher.removeEventListener('mouseup', obj.dragEv.mouseUp);
  obj.outher.removeEventListener('mouseleave', obj.dragEv.mouseLeave);
  obj.outher.removeEventListener('mousemove', obj.dragEv.mouseMove);
  obj.outher.removeEventListener('touchstart', obj.dragEv.mouseDown);
  obj.outher.removeEventListener('touchend', obj.dragEv.mouseUp);
  obj.outher.removeEventListener('touchmove', obj.dragEv.mouseMove);
  obj.outher.removeEventListener('dragstart', obj.dragEv.preventDrag);
}