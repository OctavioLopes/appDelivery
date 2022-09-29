import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import Login from './pages/login';
import Register from './pages/register/Register';
import Admin from './pages/Admin';
import SallesOrders from './pages/SallesOrders';
import Products from './pages/cliente/Products';
import store from './redux/store';
import Checkout from './pages/cliente/Checkout';
import MyOrders from './pages/cliente/MyOrders';
import OrderDetails from './pages/cliente/orderDetails';

function App() {
  return (
    <Provider store={ store }>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/seller/orders" component={ SallesOrders } />
        <Route path="/customer/products" component={ Products } />
        <Route path="/admin/manage" component={ Admin } />
        <Route path="/customer/checkout" component={ Checkout } />
        <Route path="/customer/orders/:id" component={ OrderDetails } />
        <Route exact path="/customer/orders" component={ MyOrders } />
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
      </Switch>
    </Provider>
  );
}
export default App;
