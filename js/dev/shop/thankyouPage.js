import { React } from "../DOM/domReact";
import { CheckoutReview, PriceHTML } from "./components";
import { calcRealPrice } from "./checkout";

export const thankyouPage = ({ sets }) => {
  let wrap = <div className="thankyou-page white-bg"></div>;

  let head = createHead({ sets });
  let review = createReview({ sets });
  let cartReview = createCartReview({ sets });
  let thankFoot = createThankFoot({ sets });

  wrap.appendChild(head);
  wrap.appendChild(review);
  let rev = dom.findFirst('.order-review', wrap);
  if (rev) dom.addClass(rev, 'checkout-review');
  wrap.appendChild(cartReview);

  wrap.appendChild(thankFoot);

  return wrap;
}



const createHead = ({ sets }) => {
  return (
    <div className="thank-head">
      <h3 className="title">Ваш заказ оформлен.</h3>
      <h4 className="subtitle">Номер заказа: <strong>#{sets.orderId}</strong></h4>
    </div>
  );
}



const createReview = ({ sets }) => {
  let shipKey = Object.keys(sets.shipMethod)[0];

  let shipMethod = sets.shipMethod[shipKey];
  let payMethod = sets.payMethod[Object.keys(sets.payMethod)[0]];
  let typeClient = sets.typeClient[Object.keys(sets.typeClient)[0]];

  let pickupAddress = sets.pickupAddress[shipKey];
  let shipAmount = sets.shipPrices[shipKey];

  let html = CheckoutReview({
    total: calcRealPrice({ sets }),
    currency: sets.cart[0].currency,
    totalProds: sets.cart.length,
    shipMethod,
    payMethod,
    totalDiscount: sets.totalDiscount,
    coupons: sets.coupons,
    typeClient: typeClient,
    pickupAddress: pickupAddress,
    shipAmount: shipAmount
  });

  return html;
}







const createCartReview = ({ sets }) => {
  let cart = sets.cart;
  console.log(sets);

  let wrap = <div className="thank-cart"></div>;

  wrap.appendChild((<h4 className="title">Товары в заказе:</h4>));

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
        <div className="quantity-col">
          <span className="text">Кол-во</span>
          <span className="value">{item.quantity}</span>
        </div>
        <div className="price-col" data-id={item.id}></div>
      </div>
    );

    let priceCol = dom.findFirst('.price-col', row);
    let priceHTML = PriceHTML({ amount: item.amount, currency: item.currency });
    priceCol.appendChild((<span className="text">Сумма:</span>));
    priceCol.appendChild(priceHTML);
    row.appendChild(priceCol);

    wrap.appendChild(row);
  });

  return wrap;
}





const createThankFoot = ({ sets }) => {
  return (
    <div className="thank-foot">
      <h4 className="title">Спасибо, что выбрали нас!</h4>
    </div>
  )
}