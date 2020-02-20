import { DOM } from './DOM.js';





export class DomResponsiveMarkup extends DOM {

  constructor(container) {
    super();

    this.container = this.getContainer(container);
    if (!this.container) return;

    if (!this.getElements()) return;

    this.breakpoint = responsive.tablet;

    this.markUp = window.isMobile() || window.isTablet() ? 'mobile' : 'desktop';
    this.markUp === 'mobile' && this.changeToMobilePosition();

    this.init();
  }




  getElements() {
    this.desktop = [];
    this.mobile = [];
    this.el = [];

    let items = this.findAll('.responsive-markup', this.container);

    if (!items) return false;
    if (!items.length) return false;

    items.forEach(item => {
      let mobile = this.findFirst(item.dataset.mobile);
      let desktop = item.parentNode;
      this.el.push(item);
      this.desktop.push(desktop);
      this.mobile.push(mobile);
    });

    return true;
  }




  init() {
    this.getMarkup();
    window.addEventListener('resize', e => {
      this.getMarkup();
    });
  }





  getMarkup () {
    let markUp;

    if (window.isTablet() || window.isMobile()) {
      markUp = 'mobile';
    } else {
      markUp = 'desktop';
    }

    if ( markUp !== this.markUp ) {
      this.markUp = markUp;
      this.changeItemsPosition();
    }
  }



  changeItemsPosition() {
    if (this.markUp === 'mobile') {
      this.changeToMobilePosition();
    } else {
      this.changeToDesktopPosition();
    }
  }



  changeToMobilePosition() {
    this.el.forEach((el, i) => {
      if (this.mobile[i]) {
        this.mobile[i].innerHTML = '';
        this.mobile[i].appendChild(el);
      }
    });
  }



  changeToDesktopPosition() {
    this.el.forEach((el, i) => {
      if (this.desktop[i]) {
        this.desktop[i].innerHTML = '';
        this.desktop[i].appendChild(el);
      }
    });
  }


}
