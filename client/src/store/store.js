import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { startRideReducer, endRideReducer } from './reducers/rideReducers';
import {
  raiseBidReducer,
  acceptBidReducer,
  listBidsReducer,
} from './reducers/bidReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  startRide: startRideReducer,
  endRide: endRideReducer,
  raiseBid: raiseBidReducer,
  acceptBid: acceptBidReducer,
  listBids: listBidsReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
