import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ProductCard(props) {
  const { urlImage, price, id, name: nome, changeTotalPrice } = props;

  const [state, setState] = useState({
    quantity: 0,
  });

  const handleClick = ({ target }) => {
    const { name } = target;
    if (name === 'plus-button') {
      setState({ quantity: state.quantity + 1 });
    } else if (name === 'minus-button' && state.quantity >= 1) {
      setState({ quantity: state.quantity - 1 });
    }
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    console.log(value.length);
    if (value.isNaN || value.length === 0) {
      setState({ quantity: '' });
    } else {
      setState({ quantity: parseInt(value, 10) });
    }
  };

  const changeString = (arg) => {
    const aux = arg.substring(0, arg.indexOf('.'));
    const newPrice = `${aux},${arg.substring(arg.indexOf('.') + 1)}`;
    return newPrice;
  };
  useEffect(() => {
    changeTotalPrice(id, nome, state.quantity, price);
  }, [state.quantity]);

  return (
    <div id={ id } className="products-card-div">
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {changeString(price)}
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage } // eslint-disable-line
        alt="drinkImg"
        style={ { width: '100px' } }
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{nome}</p>
      <div>
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ (e) => handleClick(e) }
          name="minus-button"
          type="button"
        >
          -
        </button>
        <input
          style={ { textAlign: 'center' } }
          onChange={ (e) => handleChange(e) }
          type="text"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ state.quantity }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ (e) => handleClick(e) }
          name="plus-button"
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  urlImage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  changeTotalPrice: PropTypes.func.isRequired,
};

export default ProductCard;
