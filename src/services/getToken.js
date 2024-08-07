// utils/getToken.js
import { store } from '../app/store'; // Import your Redux store
import Cookies from 'js-cookie';

export const getToken = () => {
  const state = store.getState();
  return state.home.token || Cookies.get('userToken');
};
