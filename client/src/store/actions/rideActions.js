import {
  RIDE_START_REQUEST,
  RIDE_START_SUCCESS,
  RIDE_START_FAIL,
  RIDE_END_REQUEST,
  RIDE_END_SUCCESS,
  RIDE_END_FAIL,
} from '../constants/rideConstants';
 import axios from 'axios';

export const startRide = (email, password) => async (dispatch) => {
  try {
      dispatch({
        type: RIDE_START_REQUEST,
      });
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
    const { data } = await axios.post(
      '/',
      {
        email: email,
        password: password,
      },
      config
    );
    dispatch({
      type: RIDE_START_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RIDE_START_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const endRide = (email, password) => async (dispatch) => {
    try {
        dispatch({
          type: RIDE_END_REQUEST,
        });
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
      const { data } = await axios.post(
        '/',
        {
          email: email,
          password: password,
        },
        config
      );
      dispatch({
        type: RIDE_END_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RIDE_END_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
