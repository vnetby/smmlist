import { React } from "../DOM/domReact";



const BTNS = {
  register: () => <a href={back_dates.register_url} className="btn gold-btn register-btn lg-btn">регистрация</a>,
  openCart: () => <a href="#" className="btn gold-btn open-cart-btn lg-btn">открыть корзину</a>,
  no: () => <></>
}






export const ConfirmModal = ({ msg }) => {
  let modal = (
    <div className="alert-modal confirm-modal">
      <div className="modal-body">
      </div>
      <div className="modal-foot">
        <div className="btn-row">
          <button type="button" className="js-confirm-btn btn red-btn lg-btn">Да</button>
          <button type="button" className="js-reject-btn btn gold-btn lg-btn">Нет</button>
        </div>
      </div>
    </div>
  );
  let body = dom.findFirst('.modal-body', modal);
  body.innerHTML = msg;
  return modal;
}




export const AlertModal = ({ msg, title, btn }) => {
  btn = btn === undefined ? 'register' : btn;
  msg = msg ? msg : '';
  let modal = <div className="alert-modal"></div>;
  if (title) {
    modal.appendChild((
      <h3 className="modal=title">{title}</h3>
    ));
  }
  let body = <div className="modal-body"></div>;
  body.innerHTML = msg;
  modal.appendChild(body);
  if (BTNS[btn]) {
    modal.appendChild((
      <div className="modal-foot">
        <div className="btn-row">
          {BTNS[btn]()}
        </div>
      </div>
    ));
  }
  return modal;
}




export const ModalCart = ({ cart, coupon, checkout }) => {

  let cartHTML = <div className={`modal-cart${checkout ? ' checkout-cart' : ''}`}></div>;
  let head = <div className="cart-head">Корзина</div>;
  let body = <div className="cart-body"></div>;

  if (checkout) {
    cartHTML.appendChild((
      <div className="checkout-items-head">
        <div className="table-col head-prod-col">Товар</div>
        <div className="table-col head-single-price-col">Цена за ед.</div>
        <div className="table-col head-quant-col">Кол-во</div>
        <div className="table-col head-total-col">Итого</div>
      </div>
    ));
  }
  cart.forEach(item => {
    let row = (
      <div className="cart-row">
        <div className="thumb">
          <img src={item.img} alt="cart product preview" />
        </div>
        <div className="title">
          <h3 className="prod-title"><a href={item.link}>{item.name}</a></h3>
          <div className="sku">{item.sku}</div>
        </div>
        <div className="single-price-col" data-id={item.id}></div>
        <div className="change-quantity">
          <div className="custom-number-input" data-min="1">
            <span className="minus">-</span>
            <input className="quantity-input" type="number" min="1" value={item.quantity} data-id={item.id} />
            <span className="plus">+</span>
          </div>
        </div>
        <div className="price-col" data-id={item.id}>
        </div>
        <div className="set-col">
          <span className="rm-from-cart" data-id={item.id}>x</span>
        </div>
        <div className="cart-item-controls">
          <div className="delete-control rm-from-cart" data-id={item.id}>
            <span className="bg-ico delete-ico"></span>
            <span className="text">Удалить</span>
          </div>
        </div>
      </div>
    );
    body.appendChild(row);
  });


  let foot = (
    <div className="cart-foot">
      <div className="btn-col">
        <a href={back_dates.checkout_url} className="btn gold-btn lg-btn checkout-btn">Оформить заказ</a>
      </div>
      <div className="total-col">
        <div className="count-prods-row">
          <span className="text">Всего товаров:</span>
          <span className="total-prods">{cart.length}</span>
        </div>
        <div className="count-total-row">
          <span className="text">Итог:</span>
          <span className="total-price"></span>
        </div>
      </div>
    </div>
  );

  cartHTML.appendChild(head);
  cartHTML.appendChild(body);
  cartHTML.appendChild(foot);

  if (coupon) {
    let couponHTML = (
      <div className="coupon-row">
        <span className="text">Есть промокод ?</span>
        <input type="text" className="input coupon-input" placeholder="Ваш промокод" />
        <button type="button" className="apply-coupon btn gold-btn lg-btn">Добавить</button>
      </div>
    );
    cartHTML.appendChild(couponHTML);
  }
  return cartHTML;
}








export const TotalAmountCoupon = ({ amount, currency }) => {
  return (
    <div className="total-amount-coupon">
      <span className="text">Итог с промкодом:</span>
      <span className="price">{amount}</span>
      <span className="currency">{currency}</span>
    </div>
  );
}




export const CheckoutReview = ({ total, currency, totalProds, shipMethod, payMethod, coupons, totalDiscount, typeClient, pickupAddress, shipAmount }) => {
  // console.log(total, currency, totalProds, shipMethod, payMethod, coupons, totalDiscount, typeClient);

  let review = <div className="order-review"></div>;

  let totalRow = (
    <div className="total-review">
      <div className="title">Итог:</div>
      <div className="value"></div>
    </div>
  );
  let val = dom.findFirst('.value', totalRow);
  val.appendChild(PriceHTML({ amount: total, currency }));
  review.appendChild(totalRow);

  if (totalProds) {
    review.appendChild((
      <div className="total-prods-row">
        <div className="title">Товаров:</div>
        <div className="value">{totalProds} шт.</div>
      </div>
    ))
  }

  if (coupons) {
    let couponsWrap = <div className="coupons-wrap"></div>;
    coupons.forEach(coupon => {
      couponsWrap.appendChild((
        <div className="coupon-row">
          <div className="title">Скидка</div>
          <div className="value">{coupon.totalDiscount} <span className="delete-coupon" data-id={coupon.post_title} title="удалить">X</span> </div>
        </div>
      ));
    });
    review.appendChild(couponsWrap);
  }

  if (typeClient) {
    review.appendChild((
      <div className="type-client info-row">
        <div className="title">Тип плательщика:</div>
        <div className="value">{typeClient}</div>
      </div>
    ));
  }

  if (shipMethod) {
    review.appendChild((
      <div className="ship-method info-row">
        <div className="title">Способ доставки:</div>
        <div className="value">{shipMethod}</div>
      </div>
    ));
  }

  if (shipAmount) {
    review.appendChild((
      <div className="ship-method info-row">
        <div className="title">Стоимость доставки:</div>
        <div className="value">{`${shipAmount} ${currency}`}</div>
      </div>
    ));
  }

  if (pickupAddress) {
    review.appendChild((
      <div className="ship-method info-row">
        <div className="title">Адрес пункта самовывоза:</div>
        <div className="value">{pickupAddress}</div>
      </div>
    ));
  }

  if (payMethod) {
    review.appendChild((
      <div className="pay-method info-row">
        <div className="title">Способ оплаты:</div>
        <div className="value">{payMethod}</div>
      </div>
    ));
  }

  review.appendChild((
    <div className="btn-row">
      <a href="#" className="btn lg-btn grey-border-btn send-order-btn">Купить</a>
    </div>
  ));

  return review;
}



export const PriceHTML = ({ amount, currency }) => {
  return (
    <span class="woocommerce-Price-amount amount">{parseFloat(amount).toFixed(2)} <span class="woocommerce-Price-currencySymbol">{currency}</span></span>
  );
}



export const EmptyCartHTML = () => {
  return (
    <div className="checkout-empty-cart">
      У Вас нет товаров в корзине.<br></br>
      <div className="btn-row">
        <a href={back_dates.catalog_url} class="btn red-border-btn lg-btn">Перейти в каталог</a>
      </div>
    </div>
  );
}