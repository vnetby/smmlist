import { React } from "./DOM/domReact";

export const customInputFile = wrap => {
  let container = dom.getContainer(wrap);

  let inputs = dom.findAll('input[type=file]', container);

  if (!inputs || !inputs.length) return;

  inputs.forEach(input => {
    let wrap = (
      <label className="custom-input-file">
        <div className="file-ico"></div>
        <div className="file-label"><p>Прикрепить файл </p>( ворд, эксель, джипег, пнг)</div>
      </label>
    );
    let parent = input.parentNode;
    wrap.appendChild(input);
    parent.appendChild(wrap);

    dom.onChange(input, e => {
      setLabel({ item: wrap, e });
    });
  });
}




const setLabel = ({ item, e }) => {
  let name;
  if (!e.target.files[0]) {
    name = '<p>Прикрепить файл</p>( ворд, эксель, джипег, пнг)';
  } else {
    name = e.target.files[0].name;
  }
  let label = dom.findFirst('.file-label', item);
  label.innerHTML = name;
}