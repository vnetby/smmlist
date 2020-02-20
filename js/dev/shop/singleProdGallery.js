import { React } from "../DOM/domReact";


const PREVIEW_SLICK_SETS = {
  vertical: true,
  verticalSwiping: true,
  slidesToShow: 3,
  arrows: false,
  lazyLoad: 'progressive',
  infinite: false
}

const MAIN_SLICK_SETS = {
  arrows: false,
  lazyLoad: 'progressive',
  infinite: false
}


export const singleProdGallery = wrap => {
  let container = dom.getContainer(wrap);
  let gallery = dom.findFirst('.single-prod-gallery', container);
  if (!gallery) return;

  let preview = dom.findFirst('.previews', gallery);
  let main = dom.findFirst('.main-gallery', gallery);

  if (!preview || !main) return;
  let $preview = $(preview);
  let $main = $(main);

  $preview.on('init', e => {
    initThumbnailsClick({ preview, $preview });
  });

  $preview.on('lazyLoaded', () => {
    dom.addClass(preview, 'visible');
    if (!main.classList.contains('visible')) return;
    dom.addClass(gallery, 'visible');
  });

  $main.on('lazyLoaded', () => {
    dom.addClass(main, 'visible');
    if (!preview.classList.contains('visible')) return;
    dom.addClass(gallery, 'visible');
  });

  $preview.slick({ ...PREVIEW_SLICK_SETS, asNavFor: $main });

  $main.slick({ ...MAIN_SLICK_SETS, asNavFor: $preview });

  let colorsSelect = dom.findAll('.select-prod-color');
  if (!colorsSelect || !colorsSelect.length) return;

  let sets = {
    btns: colorsSelect,
    preview: preview,
    main: main,
    $main: $main,
    $preview: $preview,
    gallery: gallery,

    current: 'main'
  };

  getDefaultGallery({ sets });
  getColorImages({ sets });
  initColorsSelect({ sets });
}



const initThumbnailsClick = ({ preview, $preview }) => {
  let items = dom.findAll('.img-thumb', preview);
  if (!items || !items.length) return;

  dom.onClick(items, e => {
    e.preventDefault();
    $preview.slick('slickGoTo', parseInt(e.currentTarget.dataset.slickIndex));
  });
}




const getDefaultGallery = ({ sets }) => {
  sets.mainImages = dom.findAll('img', sets.main);
  sets.previewImages = dom.findAll('img', sets.preview);
}


const initColorsSelect = ({ sets }) => {
  // console.log(sets);
  sets.btns.forEach((btn, i) => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      sets.current = i;
      let btn = e.currentTarget;
      if (btn.classList.contains('active')) {

        dom.removeClass(btn, 'active');
        setDefaultGallery({ sets });
        return;
      }
      dom.removeClass(sets.btns, 'active');
      setColorGallery({ sets, btn, i });
      dom.addClass(btn, 'active');
    });
  });


  // document.body.addEventListener('click', e => {
  //   setDefaultGallery({ sets });
  //   dom.removeClass(sets.btns, 'active');
  // });

}





const setDefaultGallery = ({ sets }) => {
  if (sets.current === 'main') return;
  sets.current = 'main';

  setGallery({ sets, previewImages: sets.previewImages, fullImages: sets.mainImages });
}


const setColorGallery = ({ sets, btn, i }) => {

  let images = sets.images[i];
  if (!images) return;

  setGallery({ sets, previewImages: images, fullImages: images });

}






const setGallery = ({ sets, previewImages, fullImages }) => {
  clearTimeout(sets.tiemoutFn);

  dom.removeClass(sets.gallery, 'visible');
  dom.addCss(sets.main, { height: sets.main.offsetHeight + 'px' });

  sets.tiemoutFn = setTimeout(() => {

    sets.$main.slick('unslick');
    sets.$preview.slick('unslick');


    let id = 'mainGallery';

    sets.main.innerHTML = '';
    sets.preview.innerHTML = '';

    fullImages.forEach(img => sets.main.appendChild(createMainSlideItem({ img, id })));
    previewImages.forEach(img => sets.preview.appendChild(createPreviewSlideItem({ img })));

    sets.$preview.on('init', e => {
      initThumbnailsClick({ preview: sets.preview, $preview: sets.$preview });
    });

    sets.$main.slick({ ...MAIN_SLICK_SETS, asNavFor: sets.$preview });
    sets.$preview.slick({ ...PREVIEW_SLICK_SETS, asNavFor: sets.$main });

    dom.removeCss(sets.main, ['height']);
    dom.addClass(sets.gallery, 'visible');
  }, 300);
}



const createMainSlideItem = ({ img, id }) => {

  let image = <div className="img-full"></div>;
  let link = <a href={img.src} data-fancybox={id}></a>;
  link.appendChild(img.cloneNode());
  image.appendChild(link);
  return image;

}




const createPreviewSlideItem = ({ img }) => {
  let wrap = <div className="img-thumb"></div>;
  let imgWrap = <div className="img-wrap"></div>;
  imgWrap.appendChild(img.cloneNode());
  wrap.appendChild(imgWrap);
  return wrap;
}






const getColorImages = ({ sets }) => {
  sets.images = [];

  sets.btns.forEach(btn => {
    if (!btn.dataset.gallery) {
      sets.immages.push();
      return;
    }
    sets.images.push(JSON.parse(btn.dataset.gallery).map(item => <img src={item} alt="image" />));
  });

  console.log(sets.images);
}