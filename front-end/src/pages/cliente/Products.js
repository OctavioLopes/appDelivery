import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import ProductCard from '../../components/productCard';
import actionOrderCart from '../../redux/actions/orderCart';
import actionSaleInfo from '../../redux/actions/saleInfo';
import totalPrice from '../../redux/actions/totalPrice';
import { requestData } from '../../services/requests';

function Products() {
  const dispatch = useDispatch();
  const imgsArray = [
    'skol_lata_350ml.jpg',
    'heineken_600ml.jpg',
    'antarctica_pilsen_300ml.jpg',
    'brahma_600ml.jpg',
    'skol_269ml.jpg',
    'skol_beats_senses_313ml.jpg',
    'becks_330ml.jpg',
    'brahma_duplo_malte_350ml.jpg',
    'becks_600ml.jpg',
    'skol_beats_senses_269ml.jpg',
    'stella_artois_275ml.jpg',
  ];
  const [state, setState] = useState({
    products: [],
    total: 0,
  });
  const [cartProducts, setCartProducts] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const Navigate = useHistory();

  useEffect(() => {
    const apiData = async () => requestData('/customer/products')
      .then((response) => response)
      .then((data) => {
        setState({ products: data });
      });
    apiData();
  }, []);

  const changeString = (arg) => {
    const aux = arg.substring(0, arg.indexOf(','));
    const newPrice = `${aux}.${arg.substring(arg.indexOf(',') + 1)}`;
    return parseFloat(newPrice).toFixed(2);
  };

  const changeString2 = (arg) => {
    const aux = arg.substring(0, arg.indexOf('.'));
    const newPrice = `${aux},${arg.substring(arg.indexOf('.') + 1)}`;
    return newPrice;
  };

  const isNumber = (param) => {
    if (param === '') {
      return 0;
    }
    return param;
  };

  const changeTotalPrice = (id, name, quantity, price) => {
    const divsArray = document.querySelectorAll('.products-card-div');
    let total = 0;
    divsArray.forEach((item) => {
      const newItem = changeString(item.children[0].innerText);
      const newValue = isNumber(item.children[3].childNodes[1].value);
      total += newItem * newValue;
    });
    if (total !== 0) setDisabled(false);
    if (total === 0) setDisabled(true);
    setState({ ...state, total: total.toFixed(2) });
    const subtotal = price * quantity;
    const filteredCartProducts = cartProducts.filter((item) => item.quantity !== 0
    && item.description !== name);
    setCartProducts(
      [...filteredCartProducts, { id, description: name, quantity, price, subtotal },
      ],
    );
  };

  return (
    <>
      <Header />
      <div>
        {state.products.map((item, index) => (
          <ProductCard
            data-testid={ `customer_products__element-card-title-${item.id}` }
            key={ item.id }
            id={ item.id }
            urlImage={ `http://localhost:3001/images/${imgsArray[index]}` }
            price={ item.price }
            name={ item.name }
            changeTotalPrice={ changeTotalPrice }
          />
        ))}
        <button
          data-testid="customer_products__button-cart"
          disabled={ disabled }
          onClick={ () => {
            dispatch(totalPrice(state.total));
            dispatch(actionOrderCart(cartProducts));
            dispatch(actionSaleInfo({ saleDate: new Date() }));
            Navigate.push('/customer/checkout');
          } }
          type="button"
        >
          Ver Carrinho:
          {' '}
          <p
            data-testid="customer_products__checkout-bottom-value"
          >
            { changeString2(`${state.total}`) }
          </p>
        </button>
      </div>
    </>
  );
}

export default Products;
