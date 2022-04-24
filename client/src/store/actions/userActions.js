import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
} from '../constants/userConstants';
import axios from 'axios';

export const login = (wallet, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/',
      {
        wallet: wallet,
        password: password,
      },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

//   export const logout = () => async (dispatch) => {
//     const config = {
//       headers: {
//         'Content-type': 'application/json',
//       },
//     };
//     await axios.post('/dj-rest-auth/logout/', config);
//     localStorage.removeItem('userInfo');
//     dispatch({
//       type: USER_LOGOUT,
//     });
//   };

export const register = (
  username,
  firstname,
  lastname,
  email,
  password1,
  password2,
  department,
  is_driver
) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data, status } = await axios.post(
      '/',
      {
        username: username,
        email: email,
        first_name: firstname,
        last_name: lastname,
        password1: password1,
        password2: password2,
        department: department,
        is_driver: is_driver,
      },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
    return status;
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
