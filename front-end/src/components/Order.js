import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import actionOrderCart from '../redux/actions/orderCart';
import actionTotalPrice from '../redux/actions/totalPrice';

function CheckoutCard(props) {
  const dispatch = useDispatch();
  const { id, name, quantity, price, subtotal, orderCart } = props;

  const changeString = (arg) => {
    const aux = arg.substring(0, arg.indexOf('.'));
    const newPrice = `${aux},${arg.substring(arg.indexOf('.') + 1)}`;
    return newPrice;
  };

  const filterOrderCart = () => {
    const filteredOrderCart = orderCart.filter((item) => item.description !== name);
    dispatch(actionOrderCart(filteredOrderCart));
    console.log(filteredOrderCart);
    let soma = 0;
    if (filteredOrderCart.length === 0) {
      soma = 0;
      dispatch(actionTotalPrice(soma.toFixed(2)));
    } else {
      filteredOrderCart.forEach((item) => {
        const newSubtotal = parseFloat(item.subtotal);
        console.log(newSubtotal);
        soma += newSubtotal;
        console.log(soma);
      });
      dispatch(actionTotalPrice(soma.toString()));
    }
  };

  return (
    <>
      <td>{ id }</td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${id - 1}` }
      >
        { name }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${id - 1}` }
      >
        { quantity }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${id - 1}` }
      >
        { changeString(price.toString()) }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${id - 1}` }
      >
        { changeString(subtotal.toFixed(2).toString()) }
      </td>
      <td>
        <button
          data-testid={ `customer_checkout__element-order-table-remove-${id - 1}` }
          onClick={ filterOrderCart }
          type="button"
        >
          Remover
        </button>
      </td>
    </>
  );
}

CheckoutCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  orderCart: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CheckoutCard;
