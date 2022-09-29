import React, { useState, useEffect } from 'react';
import Order from '../components/Order';
import Header from '../components/Header';
import { requestOrders } from '../services/requests';

function SallesOrders() {
  const [ordersOfSeller, setOrdersOfSeller] = useState([]);
  const sellerId = 1;

  useEffect(() => {
    const getAllOrders = async () => {
      await requestOrders(`/sale/${sellerId}`).then(
        (response) => setOrdersOfSeller(response),
      );
    };
    getAllOrders();
  }, []);

  return (
    <div>
      <Header nameUser="Manoel" roleUser="Seller" />
      <section className="sales-order--container">
        {
          ordersOfSeller.map((item, index) => (
            <Order
              key={ index }
              id={ item.id }
              status={ item.status }
              date={ item.saleDate }
              value={ item.totalPrice }
              address={ item.deliveryAdress }
            />
          ))
        }
      </section>
      <button type="button"> test </button>
    </div>
  );
}

export default SallesOrders;
