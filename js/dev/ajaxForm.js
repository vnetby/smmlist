import { React } from "./DOM/domReact";
import { AlertModal } from "./shop/components";

const MSG = {
  required: 'Заполните поле',
  error_email_format: 'Не верный формат e-mail',
  compare_error: 'Значения не совпадают'
}


export const ajaxForm = wrap => {
  let container = dom.getContainer(wrap);
  let forms = dom.findAll('.ajax-form', container);
  if (!forms || !forms.length) return;


  forms.forEach(form => {
    initValidate({ form });
    init({ form });
  });
}






const initValidate = ({ form }) => {
  let btn = dom.findFirst('button[type="submit"]', form);
  dom.onClick(btn, e => {
    e.preventDefault();
    let valid = validateForm({ form });
    if (!valid) return;
    dom.dispatch(form, 'submit');
  });
}




const init = ({ form }) => {

  initRemoveInputsError({ form });

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (form.classList.contains('submitted')) return;

    dom.addClass(form, 'submitted');

    dom.addPreloader(form);

    hideReponse({ form });

    let fields = new FormData(form);
    dom.ajax({
      url: back_dates.ajax_url + '?action=ajax_form&fn=' + form.getAttribute('action'),
      data: fields
    })
      .then(res => {
        // console.log(res);
        // return;
        parseResponse({ res, form });
        dom.removeClass(form, 'submitted');
        dom.removePreloader(form);
      });
  });
}










/**
 * @param {res} string response
 * @param {form} dom form
 * 
 * @return undefined
 */

const parseResponse = ({ res, form }) => {

  try {
    res = JSON.parse(res);
  } catch (err) {
    console.info(res);
    return;
  }

  if (res.redirect) {
    window.location.href = res.redirect;
    return;
  }

  if (res.reload) {
    window.location.href = window.location.href;
  }

  if (res.cleareInputs) {
    clearInputs({ form, argInputs: res.clearInputs });
  }

  if (res.msg) {
    displayMsg({ msg: res.msg, type: res.type, form });
  }

  if (res.input) {
    let inputs = [];

    if (Array.isArray(res.input)) {
      inputs = res.input.map(name => dom.findFirst(`.input[name=${name}]`, form));
    } else {
      inputs = [dom.findFirst(`.input[name=${res.input}]`, form)];
    }
    addInputsError({ inputs });
  }


  if (res.action) {
    doResponseAction({ action: res.action, form });
  }


  if (res.alert) {
    let modal = AlertModal({ msg: res.alert, btn: false });
    $.fancybox.open(modal, { touch: false });
  }



}





/**
 * @param {action} string action key
 * @param {form} dom form
 * - will call function __{action}
 */

const doResponseAction = ({ action, form }) => {
  if (action === 'reset_tmp_login') {
    __reset_tmp_login({ form });
    return;
  }
}






const __reset_tmp_login = ({ form }) => {
  dom.onClick('.send-register-instruction', e => {
    e.preventDefault();
    dom.addPreloader(form);
    let data = new FormData(form);
    dom.ajax({
      url: back_dates.ajax_url + '?action=ajax_form&fn=reset_tmp_login',
      data: data
    })
      .then(res => {
        parseResponse({ res, form });
        dom.removePreloader(form);
      });
  }, form);
}







/**
 * 
 * @param {form} dom form
 * - clear all inputs values in form 
 */

const clearInputs = ({ form }) => {

  let inputs = dom.findAll('.input', form);
  if (!inputs || !inputs.length) return;

  inputs.forEach(input => {
    if (input.type === 'checkbox') {
      input.checked = false;
      return;
    }
    input.value = '';
  });
}







/**
 * 
 * @param {msg} string message to display 
 * @param {type} string success/error will be addeded as class to response container
 * @param {form} dom form
 * 
 * @return undefined 
 */

const displayMsg = ({ msg, type, form }) => {
  let response = dom.findFirst('.response-form', form);
  if (!response) return;
  dom.addClass(response, 'dom-slide-up');
  dom.removeClass(response, 'success error');
  response.innerHTML = '<div class="response-wrap">' + msg + '</div>';
  dom.addClass(response, type);
  dom.slideDown(response);
}







/**
 * 
 * @param {form} dom form
 * 
 * slideUp response container
 * (do it before send response)
 */

const hideReponse = ({ form }) => {
  let response = dom.findFirst('.response-form', form);
  if (!response) return;
  dom.slideUp(response);
}








/**
 * 
 * @param {form} dom form
 * 
 * @return if valid {true} else {false}
 */

const validateForm = ({ form }) => {
  let valid = true;

  let inputs = dom.findAll('.input', form);
  if (!inputs || !inputs.length) return true;

  let compare = false;

  inputs.forEach(input => {

    if (input.dataset.compare) {
      if (!compare) compare = {};
      if (!compare[input.dataset.compare]) compare[input.dataset.compare] = [];
      compare[input.dataset.compare].push(input);
    }


    if (input.hasAttribute('required')) {
      let res = validateRequired({ input });
      valid = valid ? res : valid;
    }

    if (input.type === 'email') {
      let res = validateEmail({ input });
      valid = valid ? res : valid;
    }


  });


  if (compare && valid) valid = validateCompare({ compare });

  return valid;
}







/**
 * 
 * @param {input} dom input
 */

const validateEmail = ({ input }) => {
  if (inputHasError({ input })) return;

  if (!input.value) return true;

  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let res = re.test(String(input.value).toLowerCase());

  if (!res) addInputError({ input, msg: 'error_email_format' });

  return res;
}





/**
 * @param {input} dom
 * - check if input is compiled or checked
 */

const validateRequired = ({ input }) => {
  if (inputHasError({ input })) return;

  let res = true;

  if (input.type === 'checkbox') {
    res = input.checked;
    if (!res) addInputError({ input });
    return res;
  }

  res = !!input.value;
  if (!res) addInputError({ input, msg: 'required' });

  return res;
}





/**
 * @param {compare} object:
 * - key - compare key
 * - value - array of dom inputs
 */

const validateCompare = ({ compare }) => {
  let result = true;

  for (let key in compare) {
    let group = compare[key];
    let val = group[0].value;
    let res = !group.some(input => input.value !== val);

    if (!res) {
      result = false;
      addInputsError({ inputs: group, msg: 'compare_error' });
    }
  }
  return result;
}





/**
 * @param {inputs} array of dom inputs
 * @param {msg} string key of MSG object
 */

const addInputsError = ({ inputs, msg }) => {
  inputs.forEach(input => addInputError({ input, msg }));
}







/**
 * @param {input} dom input
 * @param {msg} string key of MSG object
 */

const addInputError = ({ input, msg }) => {
  dom.addClass(input, 'has-error');
  if (msg) addInputHelp({ input, msg });
}





/**
 * 
 * @param {input} dom input
 * @param {type} string error/success @default error
 * @param {msg} string key of MSG object @see begin current page
 */

const addInputHelp = ({ input, type, msg }) => {
  type = type ? type : 'error';

  if (!dom.findFirst('.input-help', input.parentNode)) {
    let help = <span className='input-help'></span>;
    input.parentNode.appendChild(help);
  }

  let help = dom.findFirst('.input-help', input.parentNode);
  if (!help) return;

  dom.removeClass(help, 'error success visible');
  help.innerHTML = MSG[msg];
  dom.addClass(help, `visible ${type}`);
}





/**
 * @param {form} dom form
 * - remove input errors on input change 
 */

const initRemoveInputsError = ({ form }) => {
  dom.onChange('.input', e => {
    dom.removeClass(e.currentTarget, 'has-error');
    let help = dom.findFirst('.input-help', e.currentTarget.parentNode);
    if (!help) return;
    help.innerHTML = '';
    dom.removeClass(help, 'error success visible');
  }, form);
}





const inputHasError = ({ input }) => {
  return input.classList.contains('has-error');
}