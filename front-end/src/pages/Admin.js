import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CadastroAdmin from '../components/Cadastro_admin';
import TableUsers from '../components/Table_user';
import { requestData, requestDelete, requestCreate } from '../services/requests';

// Teste

function Admin() {
  const [usersApi, setUsersApi] = useState([]);
  const [failedTryCreate, setFailedTryCreate] = useState(false);

  const apiData = async () => requestData('/login')
    .then((response) => setUsersApi(response))
    .catch((error) => console.log(error));

  const createUser = async ({ name, email, password, role }) => {
    try {
      const body = {
        name,
        email,
        password,
        role,
      };

      await requestCreate('/adm', body);

      apiData();
    } catch (error) {
      setFailedTryCreate(true);
    }
  };

  const deleteUser = async (email) => {
    try {
      console.log(email);

      await requestDelete(`/adm/${email}`);

      apiData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    apiData();
  }, []);

  return (
    <>
      <Header />
      {
        (failedTryCreate)
          ? (
            <p data-testid="admin_manage__element-invalid-register">
              {
                `Os dados já foram utilizados em uma outra conta,
                  Pro favor, verifique os dados`
              }
            </p>
          )
          : null
      }
      <CadastroAdmin
        createUser={ createUser }
      />
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Nome</td>
            <td>E-mail</td>
            <td>Tipo</td>
            <td>Excluir</td>
          </tr>
        </thead>
        <tbody>
          {usersApi.filter((item) => (item.role !== 'administrator'))
            .map((item, index) => (
              <TableUsers
                index={ index }
                data-testid={ `admin_manage__element-user-table-item-number-${item.id}` }
                key={ item.id }
                id={ item.id }
                name={ item.name }
                email={ item.email }
                tipo={ item.role }
                deleteUser={ deleteUser }
              />
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Admin;
