import { DOM } from "./DOM/DOM.js";

window.dom = new DOM;

import "@babel/polyfill";



import "../../css/dev/main.less";

import { domDropDown } from "./DOM/domDropDown";
import { domSlider } from "./DOM/domSlider";
import { domTabs } from "./DOM/domTabs";



import { dropDownMenu } from "./dropDownMenu";

import { Shop } from "./shop";

import { customNumberInput } from "./customNumberInput";

import { customSelect } from "./customSelect";

import { initOffcanvas } from "./initOffcanvas";

import { openFilterCatalog } from "./openFilterCatalog";

import { ajaxForm } from "./ajaxForm";

import { openLoginDatesForm } from "./openLoginDatesForm";

import { customInputFile } from "./customInputFile";

import { sliders } from "./sliders";

const dinamicFunctions = wrap => {
  domDropDown(wrap);
  dropDownMenu(wrap);
  domSlider(wrap);
  domTabs(wrap);

  Shop(wrap);
  customNumberInput(wrap);
  customSelect(wrap);

  initOffcanvas(wrap);

  openFilterCatalog(wrap);

  ajaxForm(wrap);

  openLoginDatesForm(wrap);

  customInputFile(wrap);

  sliders(wrap);
}



const staticFunctions = wrap => {

}




dinamicFunctions();
staticFunctions();