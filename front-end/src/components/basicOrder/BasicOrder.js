import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import dateFormat from '../../utils/date';
import './BasicOrder.css';
import changeString from '../../utils/price';

function Order({ id, status, date, value, address, userRole, dataTestId }) {
  let isVisible;

  if (userRole === 'customer') {
    isVisible = false;
  }

  const Navigate = useHistory();

  const newDate = dateFormat(date);
  const price = changeString(value);

  return (
    <div data-testid="git pull">
      <section>
        <button
          type="button"
          onClick={ () => Navigate.push(`/customer/orders/${id}`) }
        >
          <h1>
            Pedido:
            <strong data-testid={ `${dataTestId}order-id-${id}` }>
              00
              {id}
            </strong>
          </h1>
        </button>
      </section>
      <section>
        <div>
          <h2 data-testid={ `${dataTestId}delivery-status-${id}` }>
            {status}
          </h2>
        </div>
        <div>
          <article data-testid={ `${dataTestId}order-date-${id}` }>
            {newDate}
          </article>
          <article data-testid={ `${dataTestId}card-price-${id}` }>
            {price}
          </article>
        </div>
      </section>
      <h3
        className={ `isVisible${isVisible}` }
        data-testid={ `${dataTestId}card-address-${id}` }
      >
        {address}
      </h3>
    </div>
  );
}

Order.propTypes = {
  address: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default Order;
