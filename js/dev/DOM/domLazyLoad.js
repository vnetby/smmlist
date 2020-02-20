import { DOM } from "./DOM.js";

export class domLazyLoad extends DOM {


  constructor(container) {
    super();

    this.container = this.getContainer(container);
    this.lazyClass = '.img-lazy-load';
    this.transitionClass = 'img-in-load';
    this.finishClass = 'img-is-loaded';
    this.transition = 500;

    if (!this.getElements()) return;

    this.checkImagesState();

    this.init();

  }



  getElements() {
    this.images = this.findAll(this.lazyClass, this.container);
    if (!this.images || !this.images.length) return false;
    return true;
  }



  init() {
    window.addEventListener('scroll', e => {
      if (this.scrollEvent) {
        clearTimeout(this.scrollEvent);
      }
      this.scrollEvent = setTimeout(() => {
        this.checkImagesState();
      }, 20);
    });
  }




  checkImagesState() {
    this.images.forEach((div, i) => {
      if (!div) return;
      if (this.isInViewport(div, 300)) {
        this.loadImage(div, i);
      }
    });
  }



  loadImage(div, i) {
    this.images[i] = null;
    let src = div.dataset.src;


    let className = div.dataset.className;

    if (!src) return false;

    let img = new Image;


    if (className) {
      img.setAttribute('class', className);
    }

    img.addEventListener('load', this.onImageLoad.bind(this, img, div, i));
    img.src = src;
  }



  onImageLoad(img, div, i) {
    div.appendChild(img);

    let title = div.dataset.title;
    let alt = div.dataset.alt;

    if (title) {
      img.setAttribute('title', title);
    }
    if (alt) {
      img.setAttribute('alt', alt);
    }

    setTimeout(() => {
      this.addClass(div, this.finishClass);
      setTimeout(() => {
        div.parentNode.replaceChild(img, div);
      }, this.transition);
    }, 20);
  }


}