import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

function Header({
  nameUser = JSON.parse(localStorage.getItem('user')).name,
  roleUser = JSON.parse(localStorage.getItem('user')).role,
}) {
  const Navigate = useHistory();

  /* const [login, setLogin] = useState(true); */

  const logoff = () => {
    localStorage.removeItem('user');
    /* setLogin(false); */
    Navigate.push('/login');
  };

  const [administrator] = useState(['GERENCIAR USUÁRIOS']);
  const [AdministratorPages] = useState(['/admin/manage']);
  const [seller] = useState(['PEDIDOS']);
  const [SellerPages] = useState(['/seller/orders']);
  const [customer] = useState(['PRODUTOS', 'MEUS PEDIDOS']);
  const [CustomerPages] = useState(['/customer/products', '/customer/orders']);
  const [Selected, setSelected] = useState();
  const [SelectedPage, setSelectedPage] = useState();
  const [customerTestId] = useState(['products', 'orders']);
  const [sellerTestId] = useState(['orders']);
  const [Page, setPage] = useState();

  useEffect(() => {
    if (roleUser === 'administrator') {
      setSelected(administrator);
      setSelectedPage(AdministratorPages);
      setPage('admin');
    } if (roleUser === 'seller') {
      setSelected(seller);
      setSelectedPage(SellerPages);
      setPage(sellerTestId);
    } if (roleUser === 'customer' || roleUser === null) {
      setSelected(customer);
      setSelectedPage(CustomerPages);
      setPage(customerTestId);
    }
  }, [roleUser, setSelected,
    setSelectedPage, administrator, AdministratorPages, seller,
    SellerPages, customer, CustomerPages]);

  return (
    <div className="header--container">
      <div>
        {
          (Selected !== undefined)
            ? (
              Selected.map((_nameB, i) => (
                <input
                  data-testid={ `customer_products__element-navbar-link-${Page[i]}` }
                  key={ i }
                  type="button"
                  value={ Selected[i] }
                  onClick={ () => Navigate.push(SelectedPage[i]) }
                />
              ))
            )
            : <h1> Loading fail</h1>
        }
      </div>
      <div className="header--container--name">

        <h1 data-testid="customer_products__element-navbar-user-full-name">{nameUser}</h1>

        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => logoff() }
        >
          Sair
        </button>
      </div>

    </div>
  );
}

Header.propTypes = {
  nameUser: PropTypes.string.isRequired,
  roleUser: PropTypes.string.isRequired,
};

export default Header;
