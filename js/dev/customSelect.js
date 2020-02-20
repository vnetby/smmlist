export const customSelect = wrap => {
  let container = dom.getContainer(wrap);
  let items = dom.findAll('.custom-select', container);
  if (!items || !items.length) return;

  items.forEach(item => {
    let $item = $(item);
    $item.niceSelect();

    $item.on('change', e => {
      if (!e.details) {
        dom.dispatch(item, 'nice-change');
      }
    });
  });
}