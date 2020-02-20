// import { DOM } from './DOM.js';
// import { React } from './React.js';


// export class DomAjaxForm extends DOM {


//   constructor ( container ) {
//     super ();
//     this.container = this.getContainer ( container );
//     this.init();
//   }



//   init () {
//     this.forms = this.findAll('.ajax-form', this.container);
//     if ( !this.forms || !this.forms.length ) return;
//     this.forms.forEach ( formContainer => {
//       let form;
//       if ( formContainer.tagName !== 'FORM' ) {
//         form = this.findFirst('form', formContainer);
//       } else {
//         form = formContainer;
//       }
//       if ( form ) {
//         form.addEventListener('submit', e => {
//           e.preventDefault();
//           this.addPreloader( formContainer );
//           this.removeHelp( formContainer );
//           this.initAjax( form, formContainer );
//         });
//       }
//     });
//   }

//   initAjax ( form, formConainer ) {
//     if ( form.classList.contains('send-request') ) return;
//     this.addClass( form, 'send-request' );

//     this.sendRequest( form )
//     .then ( res => {
//       this.removePreloader( formConainer );
//       this.removeClass(form, 'send-request');
//       this.validateResponse( res, form, formConainer );
//     });
//   }


//   sendRequest ( form ) {
//     let formData = new FormData( form );
//     formData.append('origin', window.location.href);
//     let url = form.action;
//     let http = new XMLHttpRequest;
//     http.open('POST', url);
//     http.send( formData );
//     return new Promise ( (resolve, reject) => {
//       http.onreadystatechange = () => {
//         if ( http.readyState === 4 && http.status === 200 ) {
//           resolve ( http.responseText );
//         }
//       }
//     })
//   }



//   validateResponse ( res, form, formConainer ) {
//     console.log( res );
//     let data;
//     try {
//       data = JSON.parse( res );
//     } catch( e ) {
//       console.error( e );
//     }

//     if ( !data ) return;


//     if ( data.redirect ) {
//       window.location.href = data.redirect;
//     }


//     if ( data.clear ) {
//       if ( typeof data.clear === 'object' ) {
//         data.clear.forEach ( id => {
//           let input = this.findFirst(`#${id}`, form);
//           if ( input ) {
//             input.value = '';
//           }
//         })
//       } else {
//         this.cleanInputs( form );
//       }
//     }


//     if ( data.type === 'error' ) {
//       if ( data.inputs ) {
//         this.addInputHelp( data.inputs, form, 'error' );
//       }
//     }


//     if ( data.type === 'success' ) {
//       if ( data.inputs ) {
//         this.addInputHelp( data.inputs, form, 'success' );
//       }
//     }


//     if ( data.html ) {
//       formConainer.innerHTML = data.html;
//     }


//     if ( data.alert ) {
//       $.fancybox.close();
//       let alert = this.strToDom(data.alert);
//       // dismissModal ( alert );
//       $.fancybox.open(alert);
//     }

//   }



//   removeHelp ( form ) {
//     let helps = this.findAll('.input-help', form );
//     if ( !helps || !helps.length ) return;
//     helps.forEach ( help => {
//       this.removeClass(help, 'error');
//       this.removeClass(help, 'visible');
//       this.removeClass(help, 'success');
//     });
//   }



//   addInputHelp( inputs, form, type ) {
//     Object.keys( inputs ).forEach ( id => {

//       let msg = inputs[id];
//       let input = this.findFirst(`#${id}`, form);

//       let has = false;

//       if ( input ) {
//         let help = input.parentNode.querySelector('.input-help');
//         if ( help ) {
//           help.innerHTML = msg;
//           this.addClass(help, 'visible ' + type);
//           has = true;
//         }
//       }

//       if ( !has ) {
//         let div = this.create('div', 'input-help visible ' + type);
//         div.innerHTML = msg;
//         input.parentNode.insertBefore(div, input.nextSibling);
//       }

//     } );
//   }




//   cleanInputs ( form ) {
//     let inputs = this.findAll('input', form);
//     if ( !inputs || !inputs.length ) return;

//     inputs.forEach ( input => {
//       input.value = '';
//     })
//   }
// }




const FORM_CLASS = 'ajax-form';




export const domAjaxForm = wrap => {
  let container = dom.getContainer(wrap);
  if (!container) return;
  
}