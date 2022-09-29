/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  requestLogin,
  setToken,
  requestUserByEmail,
  requestTokenVerify,
} from '../../services/requests';
import Logo from '../../images/LogoMariaDelivery2_0.png';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isValidToken, setIsValidToken] = useState('');
  const [btnLogin] = useState([true, true]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [navigatePage, setNavigatePage] = useState('');
  const [verifyPages] = useState(
    ['/admin/manage', '/seller/orders', '/customer/products'],
  );
  const [verifyRole] = useState(['administrator', 'seller', 'customer']);
  const Navigate = useHistory();
  const recentUser = JSON.parse(localStorage.getItem('user'));

  const redirectPage = async (role) => {
    if (role === verifyRole[0]) {
      setNavigatePage(verifyPages[0]);
    } else if (role === verifyRole[1]) {
      setNavigatePage(verifyPages[1]);
    } else if (role === verifyRole[2]) {
      setNavigatePage(verifyPages[2]);
    } else {
      console.log('Teste Error');
    }
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const { token } = await requestLogin('/login', { email, password });
      setToken(token);

      const user = await requestUserByEmail(`/user/${email}`);

      localStorage.setItem('user', JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
        id: user.id,
        token,
      }));

      redirectPage(user.role);
      setIsLogged(true);
    } catch (error) {
      console.error(error);
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  const validateEmail = async (value) => {
    const REGEX_EMAIL = /\S+@\S+\.\S+/;
    if (REGEX_EMAIL.test(value)) {
      btnLogin[0] = false;
      // Adicionar verificações CSS Email
    } else {
      btnLogin[0] = true;
    // Adicionar verificações CSS Email
    }
  };

  const validatePassword = (value) => {
    const NUMBER_OF_LETTERS = 5;
    if (value.length > NUMBER_OF_LETTERS) {
      // Adicionar verificações CSS Senh
      btnLogin[1] = false;
    } else {
      btnLogin[1] = true;
    // Adicionar verificações CSS Senha
    }
  };

  const verifyDisabled = async () => {
    console.log(btnLogin[1]);
    if (btnLogin[0] === false && btnLogin[1] === false) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const verifyEmail = (value) => {
    validateEmail(value);
    verifyDisabled();
    setFailedTryLogin(false);
  };

  const verifyPassword = (value) => {
    validatePassword(value);
    verifyDisabled();
  };

  useEffect(() => {
    if (recentUser) {
      setToken(recentUser?.token);
      const data = () => (
        requestTokenVerify(`/verify/${recentUser?.token}`)
          .then((response) => response)
          .then((result) => setIsValidToken(result))
      );
      data();
      if (isValidToken === 'token valido') {
        Navigate.push('customer/products');
      }
    }
  });

  useEffect(() => {
    setFailedTryLogin(false);
  }, [email, password]);

  if (isLogged) {
    Navigate.push(navigatePage);
    return null;
  }
  return (
    <>
      <div className="login--container">
        <form className="login--form-container">
          <div className="login--form--input-container">
            <img src={ Logo } alt="logotipo" width="250px" />
            <label htmlFor="email-user">
              Login:
              <input
                data-testid="common_login__input-email"
                onChange={ (e) => verifyEmail(e.target.value) }
                onBlur={ (e) => setEmail(e.target.value) }
              />
            </label>
            <label htmlFor="email-user">
              Password:
              <input
                data-testid="common_login__input-password"
                type="password"
                onChange={
                  (e) => verifyPassword(e.target.value)
                }
                onBlur={
                  (e) => setPassword(e.target.value)
                }
              />
            </label>
            <button
              type="submit"
              disabled={ isDisabled }
              onClick={ (e) => login(e) }
              data-testid="common_login__button-login"
            >
              Login
            </button>
            <button
              type="button"
              onClick={ () => Navigate.push('/register') }
              data-testid="common_login__button-register"
            >
              Register
            </button>
          </div>
          {
            (failedTryLogin)
              ? (
                <p data-testid="common_login__element-invalid-email">
                  {
                    `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                  }
                </p>
              )
              : null
          }
        </form>
      </div>
      <div className="background">
        <p>.</p>
      </div>
    </>

  );
}

export default Login;
