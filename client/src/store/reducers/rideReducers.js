import {
  RIDE_START_REQUEST,
  RIDE_START_SUCCESS,
  RIDE_START_FAIL,
  RIDE_END_REQUEST,
  RIDE_END_SUCCESS,
  RIDE_END_FAIL,
} from '../constants/rideConstants';

export const startRideReducer = (state = {}, action) => {
  switch (action.type) {
    case RIDE_START_REQUEST:
      return { loading: true };
    case RIDE_START_SUCCESS:
      return { loading: false, rideInfo: action.payload };
    case RIDE_START_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const endRideReducer = (state = {}, action) => {
  switch (action.type) {
    case RIDE_END_REQUEST:
      return { loading: true };
    case RIDE_END_SUCCESS:
      return {};
    case RIDE_END_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
