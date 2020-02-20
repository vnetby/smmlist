const VALIDATE = false;

const FORM_CLASS = 'form-validate';

const INPUT_CLASS = 'input';

const INPUT_ERROR_CLASS = 'has-error';

const HELP_CLASS = 'input-help';

const HELP_ERROR_CLASS = 'error';




const MESSAGES = {
  required: 'Заполните поле',
  mail_format: 'Неверный формат e-mail',
  accept_terms: 'Примите условия'
}



const GENERAL_HELP_MSG = {
  required: 'Fill in all required fields',
  mail_format: 'Check e-mail',
  accept_terms: 'Примите условия'
}


const CUSTOM_INPUTS_TYPE = ['checkbox'];



export const domFormValidate = wrap => {
  let container = dom.getContainer(wrap);
  if (!container) return;

  let forms = dom.findAll(`.${FORM_CLASS}`, container);
  if (!forms || !forms.length) return;
  forms.forEach(form => {
    initValidationForm(form);
  });
}




const getHelp = input => {
  if (CUSTOM_INPUTS_TYPE.indexOf(input.type) > -1) {
    return input.parentNode.parentNode.querySelector(`.${HELP_CLASS}`);
  } else {
    return input.parentNode.querySelector(`.${HELP_CLASS}`);
  }
}



const createHelp = () => {
  let div = document.createElement('div');
  div.classList.add(HELP_CLASS);
  return div;
}






const initValidationForm = form => {
  let inputs = dom.findAll(INPUT_CLASS, form);
  if (!inputs || !inputs.length) return;

  let submitBtn = dom.findFirst('[type=submit]', form);
  if (!submitBtn) return;

  let helpContainer = form.dataset.helpContainer;
  if (helpContainer) {
    helpContainer = dom.findFirst(helpContainer, form);
  }

  inputs.forEach(input => {
    if (!helpContainer) {
      addHelp(input);
    }
    initRemoveInputError(input);
  });
  initValidation(form, inputs, submitBtn, helpContainer);
}




const addHelp = input => {
  let help = getHelp(input);
  if (!help) {
    help = createHelp();
    if (CUSTOM_INPUTS_TYPE.indexOf(input.type) > -1) {
      input.parentNode.parentNode.insertBefore(help, input.parentNode.nextSibling);
    } else {
      input.parentNode.insertBefore(help, input.nextSibling);
    }
  }
}





const initValidation = (form, inputs, submitBtn, helpContainer) => {
  submitBtn.addEventListener('click', e => {
    e.preventDefault();
    hideHelpContainer(helpContainer);
    if (validateForm(inputs, helpContainer) || !VALIDATE ) {
      dom.dispatch(form, 'submit');
    } else {
      if (helpContainer) {
        dom.slideDown(helpContainer);
      }
    }
  });
}






const hideHelpContainer = helpContainer => {
  if (!helpContainer) return;
  dom.removeClass(helpContainer, 'dom-slide-up');
  let wrap = getHelpContainerMsgWrap(helpContainer);
  wrap.innerHTML = '';
}




const validateForm = (inputs, helpContainer) => {
  let errors = [];

  inputs.forEach(input => {
    errors.push(!validateInput(input, helpContainer));
  });

  return !errors.some(item => item);
}




const validateInput = (input, helpContainer) => {

  if (input.hasAttribute('required')) {
    if (!validateRequired(input, helpContainer)) return false;
  }

  if (input.type === 'email' && input.value) {
    if (!validateEmail(input, helpContainer)) return false;
  }

  return true;
}





const initRemoveInputError = input => {
  input.addEventListener('change', e => {
    dom.removeClass(input, INPUT_ERROR_CLASS);
    let help = getHelp(input);
    if ( help ) {
      dom.removeClass(help, HELP_ERROR_CLASS);
      help.innerHTML = '';
    }
  });
}







const validateRequired = (input, helpContainer) => {
  if (input.type === 'checkbox') {
    if (!input.checked) {
      addInputError(input, 'required', helpContainer);
      return false;
    }
    return true;
  }
  if (!input.value) {
    addInputError(input, 'required', helpContainer);
    return false;
  }
  return true;
}


const validateEmail = (input, helpContainer) => {
  if (input.value.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === -1) {
    addInputError(input, 'mail_format', helpContainer);
    return false;
  }
  return true;
}




const addInputError = (input, msgKey, helpContainer) => {
  dom.addClass(input, INPUT_ERROR_CLASS);

  if (input.dataset.acceptTerms) {
    msgKey = 'accept_terms';
  }

  if (!helpContainer) {

    let help = getHelp(input);
    dom.addClass(help, HELP_ERROR_CLASS);
    // help.innerHTML = MESSAGES[msgKey];
    help.innerHTML = window.form_validate_single_msg[msgKey];

  } else {
    let wrap = getHelpContainerMsgWrap(helpContainer);

    if (!dom.findFirst(`.${msgKey}`, wrap)) {
      let row = dom.create('div', 'valid-msg ' + msgKey);
      // row.innerHTML = GENERAL_HELP_MSG[msgKey];
      row.innerHTML = window.form_validate_msg[msgKey];
      wrap.appendChild(row);
    }

  }
}





const getHelpContainerMsgWrap = helpContainer => {
  let wrap = dom.findFirst('.msg-wrapper', helpContainer);
  if (!wrap) {
    wrap = createHelpWrapContainer();
    helpContainer.appendChild(wrap);
  }
  return wrap;
}





const createHelpWrapContainer = () => {
  return dom.create('div', 'msg-wrapper');
}