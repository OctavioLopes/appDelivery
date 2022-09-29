import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DetailsCard from '../../components/detailsCard';
import Header from '../../components/Header';

function OrderDetails() {
  const { totalPrice, orderCart, saleInfo } = useSelector((state) => state);

  const Navigate = useHistory();
  const { location: { pathname } } = Navigate;

  const [orderStatus, setOrderStatus] = useState('Pendente');
  /* const [buttonStatus, setButtonStatus] = useState(false); */

  const changeString = (arg) => {
    const aux = arg.substring(0, arg.indexOf('.'));
    const newPrice = `${aux},${arg.substring(arg.indexOf('.') + 1)}`;
    return newPrice;
  };

  const onClickHandler = () => {
    setOrderStatus('Entregue');
    /* setButtonStatus(true); */
  };

  const n = 17;

  const s = 'customer_order_details__element-order-details-label-delivery-status';

  return (
    <>
      <Header />
      <div>
        <h2
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          { `Pedido: ${pathname.substring(n)} ` }
        </h2>
        <h4
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { `P. Vendedora: ${saleInfo.actualSeller} ` }
        </h4>
        <h4
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { `${saleInfo.saleDate.getDate().toString().padStart(2, '0')}` }
          { `/${String(saleInfo.saleDate.getMonth() + 1).padStart(2, '0')}` }
          { `/${saleInfo.saleDate.getFullYear()}` }
        </h4>
        <h4
          data-testid={ s }
        >
          { `${orderStatus}` }
        </h4>
        <button
          disabled
          data-testid="customer_order_details__button-delivery-check"
          type="button"
          onClick={ onClickHandler }
        >
          Marcar como entregue
        </button>
      </div>
      <table width="100%">
        <thead>
          <th>item</th>
          <th>Nome do produto</th>
          <th>Quantidade</th>
          <th>Valor unitário</th>
          <th>Sub-total</th>
        </thead>
        <tbody>
          { orderCart.map((item, index) => (
            <tr
              key={ index }
              data-testid={
                `customer_order_details__element-order-table-item-number-${index}`
              }
            >
              <DetailsCard
                key={ index }
                id={ index + 1 }
                name={ item.description }
                quantity={ item.quantity }
                price={ item.price }
                subtotal={ item.subtotal }
                orderCart={ orderCart }
              />
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p data-testid="customer_order_details__element-order-total-price">
          Valor total:
          { ' ' }
          { changeString(totalPrice.toString()) }
        </p>
      </div>
    </>
  );
}

export default OrderDetails;
