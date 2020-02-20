export const openLoginDatesForm = wrap => {
  let container = dom.getContainer(wrap);
  let openBtn = dom.findFirst('.edit-login-dates-link', container);
  if (!openBtn) return;

  let form = dom.findFirst('.login-dates-container', container);
  if (!form) return;

  let closeBtn = dom.findFirst('.close', form);

  init({ form, openBtn, closeBtn });
}




const init = ({ form, openBtn, closeBtn }) => {

  let sets = {};

  dom.onClick(openBtn, e => {
    e.preventDefault();
    openForm({ form, sets });
  });

  dom.onClick(closeBtn, e => {
    e.preventDefault();
    closeForm({ form, sets });
  });

}



const openForm = ({ form, sets }) => {
  if (form.classList.contains('active')) return;
  // clearTimeout(sets.openTimeout);
  dom.removeClass(form, 'fadeOut');

  dom.addClass(form, 'active fadeIn animated');

  setTimeout(() => {
    dom.scrollTo(form, 60);
  }, 20);
}


const closeForm = ({ form, sets }) => {
  if (!form.classList.contains('active')) return;
  clearTimeout(sets.closeTimeout);
  dom.removeClass(form, 'fadeIn');

  dom.addClass(form, 'fadeOut animated');

  sets.closeTimeout = setTimeout(() => {
    dom.removeClass(form, 'fadeOut fadeIn animated active');
  }, 300);
}