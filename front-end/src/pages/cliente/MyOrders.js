import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { requestOrdersByCustomer } from '../../services/requests';
import Order from '../../components/basicOrder/BasicOrder';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    requestOrdersByCustomer(`/customer/orders/user/${user.id}`)
      .then((response) => response)
      .then((result) => setOrders(result));
  }, [user.id]);

  return (
    <>
      <Header nameUser={ user.name } />

      tamo aqui
      {orders.length && orders.map((item, index) => (
        <Order
          key={ index }
          id={ item.id }
          status={ item.status }
          date={ item.saleDate }
          value={ item.totalPrice }
          adress={ item.deliveryAdress }
          dataTestId="customer_orders__element-"
          userRole="customer"
        />
      ))}
    </>
  );
}

export default MyOrders;
