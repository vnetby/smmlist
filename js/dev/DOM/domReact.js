export const React = {
  createElement: function (tag, attrs, children) {
    var element = document.createElement(tag);

    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        let value = attrs[name];
        if (name === 'className') {
          name = 'class';
        }
        if (value === true) {
          element.setAttribute(name, name);
        } else if (value !== false && value != null) {
          element.setAttribute(name, value.toString());
        }
      }
    }
    for (let i = 2; i < arguments.length; i++) {
      let child = arguments[i];
      element.appendChild(
        child.nodeType == null ?
          document.createTextNode(child.toString()) : child);
    }
    return element;
  }
};




// export const React = {
//   createElement: function (tag, attrs, ...children) {
//     // Custom Components will be functions
//     if (typeof tag === 'function') { return tag() }
//     // regular html tags will be strings to create the elements
//     if (typeof tag === 'string') {

//       // fragments to append multiple children to the initial node
//       const fragments = document.createDocumentFragment()
//       const element = document.createElement(tag)
//       children.forEach(child => {
//         if (child instanceof HTMLElement) {
//           fragments.appendChild(child)
//         } else if (typeof child === 'string') {
//           const textnode = document.createTextNode(child)
//           fragments.appendChild(textnode)
//         } else {
//           // later other things could not be HTMLElement not strings
//           // console.log('not appendable', child);
//         }
//       })
//       element.appendChild(fragments)
//       // Merge element with attributes
//       Object.assign(element, attrs)
//       return element
//     }
//   }
// }