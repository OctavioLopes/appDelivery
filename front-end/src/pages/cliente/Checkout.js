import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckoutCard from '../../components/checkoutCard';
import Header from '../../components/Header';
import actionSaleInfo from '../../redux/actions/saleInfo';
import { requestCreate, requestData } from '../../services/requests';

function Checkout() {
  const { totalPrice, orderCart, saleInfo } = useSelector((state) => state);
  const Navigate = useHistory();
  const [sellers, setSellers] = useState(['']);
  const [actualSeller, setSeller] = useState('Fulana Pereira');
  const [body, setBody] = useState({
    totalPrice,
    status: 'Pendente',
    products: [...orderCart],
    sellerId: 2,
  });

  useEffect(() => {
    const apiData = async () => requestData('/users/seller')
      .then((response) => response)
      .then((data) => {
        setSellers(data);
      });
    const { email } = JSON.parse(localStorage.getItem('user'));
    const apiUser = async () => requestData(`/user/${email}`)
      .then((response) => response)
      .then((data) => {
        console.log(data.id);
        setBody({ ...body, userId: data.id });
      });
    apiData();
    apiUser();
  }, []);

  const dispatch = useDispatch();

  const onClickHandler = async () => {
    console.log(actualSeller);
    const id = await requestCreate('/customer/checkout', body);
    dispatch(actionSaleInfo({ ...saleInfo, actualSeller }));
    Navigate.push(`/customer/orders/${id}`);
  };

  const onChangeHandler = ({ target }) => {
    if (target.name === 'seller') {
      const sellerId = sellers.find((item) => item.name === target.value).id;
      const sellerName = sellers.find((item) => item.name === target.value).name;
      console.log('aqui');
      setBody(
        { ...body, sellerId },
      );
      setSeller(sellerName);
    } else {
      setBody({ ...body, [target.name]: target.value });
    }
  };

  const changeString = (arg) => {
    const aux = arg.substring(0, arg.indexOf('.'));
    const newPrice = `${aux},${arg.substring(arg.indexOf('.') + 1)}`;
    return newPrice;
  };

  console.log(body);

  return (
    <>
      <Header />
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
                `customer_checkout__element-order-table-item-number-${index}`
              }
            >
              <CheckoutCard
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
      <>
        <div>
          <p data-testid="customer_checkout__element-order-total-price">
            { changeString(totalPrice.toString()) }
          </p>
        </div>
        <div>
          <h3>Detalhes e Endereço para Entrega</h3>
          <select
            onChange={ (e) => onChangeHandler(e) }
            data-testid="customer_checkout__select-seller"
            name="seller"
            id="seller"
            value={ actualSeller }
          >
            {sellers.map((seller, index) => (
              <option key={ index }>{ seller.name }</option>))}
          </select>
          <label htmlFor="input-adress">
            Endereço
            <input
              data-testid="customer_checkout__input-address"
              onChange={ (e) => onChangeHandler(e) }
              type="text"
              id="input-adress"
              name="deliveryAddress"
            />
          </label>
          <label htmlFor="input-adress-number">
            Número
            <input
              data-testid="customer_checkout__input-addressNumber"
              onChange={ (e) => onChangeHandler(e) }
              type="text"
              id="input-adress-number"
              name="deliveryNumber"
            />
          </label>
          <button
            data-testid="customer_checkout__button-submit-order"
            onClick={ onClickHandler }
            type="button"
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </>
    </>
  );
}

export default Checkout;
