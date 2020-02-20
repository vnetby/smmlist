export const setHeight = ({ obj }) => {
  if (!obj.sets.setHeight) return;
  dom.removeCss(obj.outher, ['height']);
  setTimeout(() => {
    dom.addCss(obj.outher, { height: `${obj.outher.offsetHeight}px` });
  }, 20);
}