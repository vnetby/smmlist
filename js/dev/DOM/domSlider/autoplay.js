import { getNextStep } from "./functions";
import { changeSliderTo } from "./changeSlider";

export const autoplay = ({ obj }) => {
  if (!obj.sets.autoplay) return;

  let time = parseFloat(obj.sets.autoplaySpeed);

  obj.autoplayFn = setInterval(() => {
    if (obj.pause) return;
    let step = getNextStep({ obj });
    changeSliderTo({ step, obj });
  }, time);


  obj.pauseOnHoverFn = pauseOnHoverFn.bind(obj);
  obj.playOnLeaveFn = playOnLeaveFn.bind(obj);

  if (obj.sets.pauseOnHover) {
    obj.slider.addEventListener('mouseenter', obj.pauseOnHoverFn);
    obj.slider.addEventListener('mouseleave', obj.playOnLeaveFn);
  }


  function pauseOnHoverFn() {
    this.pause = true;
    this.sets.onPause && this.sets.onPause({ obj: this });
  }

  function playOnLeaveFn() {
    this.pause = false;
    this.sets.onPlay && this.sets.onPlay({ obj: this });
  }

}


export const autoplayDestroy = ({ obj }) => {
  if (obj.autoplayFn) clearInterval(obj.autoplayFn);

  obj.slider.removeEventListener('mouseenter', obj.pauseOnHoverFn);
  obj.slider.removeEventListener('mouseleave', obj.playOnLeaveFn);
}