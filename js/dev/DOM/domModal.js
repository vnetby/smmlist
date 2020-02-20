const BTN_CLASS = 'dom-modal';


export const domModal = wrap => {
  if (!window.tingle) return;

  let container = dom.getContainer(wrap);
  if (!container) return;

  let btns = dom.findAll(`.${BTN_CLASS}`, container);
  if (!btns || !btns.length) return;

  btns.forEach(btn => {
    let target = btn.getAttribute('href');
    if (!target) {
      target = btn.dataset.target;
    }
    if (!target) return;
    
    let content = dom.findFirst(target);
    if (!content) return;

    let sets = btn.dataset.sets;
    if (sets) {
      sets = JSON.parse(sets);
    } else {
      sets = {};
    }

    btn.addEventListener('click', e => {
      e.preventDefault();
      init({ btn, content, sets });
    });
  })
}




const init = ({ btn, content, sets }) => {
  let modal = new tingle.modal({sets});
  modal.setContent(content.innerHTML);
  modal.open();
}