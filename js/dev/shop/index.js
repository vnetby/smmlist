import { catalogSidebar } from "./catalogSidebar";
import { singleProdGallery } from "./singleProdGallery";
import { singleProdNav } from "./singleProdNav";
import { productsFilter } from "./productsFilter";
import { userPageCart } from "./userPageCart";

import { productControls } from "./productControls";
import { cart } from "./cart";
import { checkout } from "./checkout";

export const Shop = wrap => {

  singleProdGallery(wrap);
  catalogSidebar(wrap);
  singleProdNav(wrap);
  productsFilter(wrap);
  productControls(wrap);
  cart(wrap);
  checkout(wrap);
  userPageCart(wrap);
}