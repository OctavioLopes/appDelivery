import axios from 'axios';

const url = process.env.REACT_APP_LOCALHOST || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${url}`,
});

export const setToken = (token) => {
  api.defaults.headers.Authorization = token;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  console.log(url);
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestOrders = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestCreate = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestDelete = async (endpoint, body) => {
  await api.delete(endpoint, { data: { body } });
};

export const requestUserByEmail = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestOrdersByCustomer = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestTokenVerify = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export default api;
