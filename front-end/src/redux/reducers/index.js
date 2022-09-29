import { combineReducers } from 'redux';
import totalPrice from './totalPriceReducer';
import orderCart from './orderCartReducer';
import saleInfo from './saleInfoReducer';

const rootReducer = combineReducers({ totalPrice, orderCart, saleInfo });

export default rootReducer;
