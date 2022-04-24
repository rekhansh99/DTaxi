import {
  BID_RAISE_REQUEST,
  BID_RAISE_SUCCESS,
  BID_RAISE_FAIL,
  BID_ACCEPT_REQUEST,
  BID_ACCEPT_SUCCESS,
  BID_ACCEPT_FAIL,
  BIDS_LIST_REQUEST,
  BIDS_LIST_SUCCESS,
  BIDS_LIST_FAIL,
} from '../constants/bidConstants';
import axios from 'axios';

export const raiseBid = (fare, walletAddress) => async (dispatch) => {
  try {
    dispatch({
      type: BID_RAISE_REQUEST,
    });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/',
      {
        fare: fare,
        walletAddress: walletAddress,
      },
      config
    );
    dispatch({
      type: BID_RAISE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BID_RAISE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const acceptBid = (walletAddress) => async (dispatch) => {
  try {
    dispatch({
      type: BID_ACCEPT_REQUEST,
    });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/',
      {
        walletAddress: walletAddress,
      },
      config
    );
    dispatch({
      type: BID_ACCEPT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BID_ACCEPT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listBids = (pickup, destination) => async (dispatch) => {
  try {
    dispatch({
      type: BIDS_LIST_REQUEST,
    });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/',
      {
        pickup: pickup,
        destination: destination
      },
      config
    );
    dispatch({
      type: BIDS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BIDS_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
