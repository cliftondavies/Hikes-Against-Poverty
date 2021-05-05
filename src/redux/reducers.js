import { combineReducers } from 'redux';
import {
  LOGIN, SET_LOADING_STATUS, SET_ERROR, SET_HIKES, SET_BOOKINGS, LOGOUT,
} from './actions';

export const hikesInitialState = {
  hikes: [],
};

export const bookingsInitialState = {
  bookings: [],
};

export const authStatus = (state = false, action) => {
  switch (action.type) {
    case LOGIN:
      return true;
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

export const loadingStatus = (state = false, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return action.payload.status;
    default:
      return state;
  }
};

export const error = (state = null, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload.error;
    default:
      return state;
  }
};

export const hikes = (state = hikesInitialState, action) => {
  switch (action.type) {
    case SET_HIKES:
      return {
        ...state,
        hikes: action.payload.hikes,
      };
    default:
      return state;
  }
};

export const bookings = (state = bookingsInitialState, action) => {
  switch (action.type) {
    case SET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload.bookings,
      };
    default:
      return state;
  }
};

export default combineReducers({
  authStatus, loadingStatus, error, hikes, bookings,
});
