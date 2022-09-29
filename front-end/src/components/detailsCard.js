import PropTypes from 'prop-types';
import changeString from '../utils/price';
/* import { useDispatch } from 'react-redux'; */

function DetailsCard(props) {
  /* const dispatch = useDispatch(); */
  const { id, name, quantity, price, subtotal } = props;

  return (
    <>
      <td>{ id }</td>
      <td
        data-testid={ `customer_order_details__element-order-table-name-${id - 1}` }
      >
        { name }
      </td>
      <td
        data-testid={ `customer_order_details__element-order-table-quantity-${id - 1}` }
      >
        { quantity }
      </td>
      <td
        data-testid={ `customer_order_details__element-order-table-unit-price-${id - 1}` }
      >
        { changeString(price.toString()) }
      </td>
      <td
        data-testid={ `customer_order_details__element-order-table-sub-total-${id - 1}` }
      >
        { changeString(subtotal.toFixed(2).toString()) }
      </td>
    </>
  );
}

DetailsCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
};

export default DetailsCard;
