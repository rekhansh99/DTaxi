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

export const raiseBidReducer = (state = {}, action) => {
  switch (action.type) {
    case BID_RAISE_REQUEST:
      return { loading: true };
    case BID_RAISE_SUCCESS:
      return { loading: false, bid: action.payload };
    case BID_RAISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const acceptBidReducer = (state = {}, action) => {
  switch (action.type) {
    case BID_ACCEPT_REQUEST:
      return { loading: true };
    case BID_ACCEPT_SUCCESS:
      return { loading: false, bid: action.payload };
    case BID_ACCEPT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listBidsReducer = (state = { bids: [] }, action) => {
  switch (action.type) {
    case BIDS_LIST_REQUEST:
      return { loading: true, bids: [] };
    case BIDS_LIST_SUCCESS:
      return { loading: false, bids: action.payload };
    case BIDS_LIST_FAIL:
      return { loading: false, errors: action.payload };

    default:
      return state;
  }
};
