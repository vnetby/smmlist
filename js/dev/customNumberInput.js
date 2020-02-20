export const customNumberInput = wrap => {
  let container = dom.getContainer(wrap);
  let inputs = dom.findAll('.custom-number-input', container);

  if (!inputs || !inputs.length) return;

  inputs.forEach(input => {
    let realInput = dom.findFirst('input', input);
    if (!realInput) return;

    let sets = {
      min: 1,
      step: 1,
      ...input.dateset
    }

    dom.onClick('.plus', e => {
      e.preventDefault();
      plusValue({ input: realInput, sets });
    }, input);
    dom.onClick('.minus', e => {
      e.preventDefault();
      minusValue({ input: realInput, sets });
    }, input);
    dom.onChange(realInput, e => {
      checkValue({ e, input: realInput, sets });
    });
  })
}



const plusValue = ({ input, sets }) => {
  let step = parseInt(sets.step);
  let val = parseInt(input.value);
  val = val ? val : 0;
  val += step;
  if (sets.max) {
    let max = parseInt(sets.max);
    if (val > max) return;
  }
  input.value = val;
  dom.dispatch(input, 'change');
}


const minusValue = ({ input, sets }) => {
  let step = parseInt(sets.step);
  let val = parseInt(input.value);
  val = val ? val : 0;
  val -= 1;
  if (sets.min) {
    let min = parseInt(sets.min);
    if (val < min) return;
  }
  input.value = val;
  dom.dispatch(input, 'change');
}



const checkValue = ({ e, input, sets }) => {
  let val = parseFloat(input.value);
  if (val > 0) return;
  input.value = 1;
  // if (input.value.math(/[!\d]/)) e.preventDefaul();
}