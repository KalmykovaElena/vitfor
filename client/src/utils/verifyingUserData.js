/* eslint-disable no-alert */
import { setAuthErrors } from '../redux/reducers/authReducer';
import { checkUserExist } from './checkUserExist';

export const verifyingUserData = (data, currentPage, dispatch, reset, navigate) => {
  const goToPage = (page) => navigate(`/${page}`);
  const existUser = checkUserExist(data);
  if (currentPage === 'registration') {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([data]));
      goToPage('personal_info/data');
    } else {
      if (existUser) {
        dispatch(setAuthErrors({ email: 'Такая почта уже зарегистрирована в системе' }));
        return;
      }
      localStorage.setItem('users', JSON.stringify([...JSON.parse(localStorage.getItem('users')), data]));
      alert('регистрация выполнена');
      goToPage('personal_info/data');
      dispatch(setAuthErrors({}));
      reset();
    }
  } else if (currentPage === 'authorization') {
    if (!existUser || existUser.password !== data.password) {
      dispatch(setAuthErrors({ email: 'Неверный адрес электронной почты или пароль' }));
    } else {
      alert('вход выполнен');
      dispatch(setAuthErrors({}));
      reset();
    }
  } else if (currentPage === 'recovery') {
    if (!existUser) {
      dispatch(setAuthErrors({ email: 'Неверный адрес электронной почты ' }));
    } else {
      dispatch(setAuthErrors({}));
      goToPage('confirm');
      reset();
    }
  }
};
