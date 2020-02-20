export const singleProdNav = wrap => {
  let container = dom.getContainer(wrap);

  let nav = dom.findFirst('#singleProductNav', container);
  if (!nav) return;

  let links = dom.findAll('.single-prod-nav', nav);
  if (!links || !links.length) return;

  dom.onClick(links, e => {
    e.preventDefault();
    if (isActiveLink({ link: e.currentTarget })) return;
    if (e.currentTarget.classList.contains('open-decline-modal')) {
      openDeclineModal();
      return;
    }

    removeAllActiveLinks({ links });
    addActiveLink({ link: e.currentTarget });


    scrollTo({ id: e.currentTarget.getAttribute('href') });
  });
}



const openDeclineModal = () => {
  let modal = dom.findFirst('#delclineModal');
  if (!modal) return;
  $.fancybox.open(modal, { touch: false });
}




const scrollTo = ({ id }) => {
  if (!id) return;
  let item = dom.findFirst(id);
  if (!item) return;

  let currentScroll = window.pageYOffset;
  let endScroll = item.getBoundingClientRect().y + window.pageYOffset - window.innerHeight / 4;

  let step = (endScroll - currentScroll) / 15;
  animateScroll({ sets: { currentScroll, endScroll, step } });
}



const animateScroll = ({ sets }) => {
  window.requestAnimationFrame(() => {
    if (sets.currentScroll < sets.endScroll) {
      sets.currentScroll += sets.step;
      window.scrollTo(0, sets.currentScroll);
      animateScroll({ sets });
    }
  });
}






const removeAllActiveLinks = ({ links }) => {
  dom.removeClass(links, 'active');
}
const addActiveLink = ({ link }) => {
  dom.addClass(link, 'active');
}
const isActiveLink = ({ link }) => {
  return link.classList.contains('active');
}