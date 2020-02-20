import OverlayScrollbars from 'overlayscrollbars';
import "./css/domCustomScrollbar.less";

const CONTAINER_CLASS = 'dom-custom-scrollbar';


export const domCustomScrollbar = container => {
  let wrap = dom.getContainer(container);

  if (!wrap) return;

  let scrollbars = dom.findAll(`.${CONTAINER_CLASS}`);
  if (!scrollbars || !scrollbars.length) return;

  scrollbars.forEach(item => {
    OverlayScrollbars(item, {
      resize: "none",
      sizeAutoCapable: true,
      paddingAbsolute: true,
      drag: true
    });
  });
}
