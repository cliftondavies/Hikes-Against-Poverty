import { combineReducers } from 'redux';
import {
  LOGIN, LOGOUT, LOAD_HIKES, LOAD_BOOKINGS, LOAD_HIKE_ERROR, LOAD_BOOKING_ERROR,
} from './actions';

export const hikesInitialState = {
  hikes: [],
  loading: 'idle',
  error: null,
};

export const bookingsInitialState = {
  bookings: [],
  loading: 'idle',
  error: null,
};

export const authenticated = (state = false, action) => {
  switch (action.type) {
    case LOGIN:
      return true;
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

export const hikes = (state = hikesInitialState, action) => {
  switch (action.type) {
    case LOAD_HIKES:
      return {
        ...state,
        hikes: action.payload.hikes,
        loading: 'completed',
        error: null,
      };
    case LOAD_HIKE_ERROR:
      return {
        ...state,
        loading: 'failed',
        error: action.payload.error,
      };
    case LOGOUT:
      return hikesInitialState;
    default:
      return state;
  }
};

export const bookings = (state = bookingsInitialState, action) => {
  switch (action.type) {
    case LOAD_BOOKINGS:
      return {
        ...state,
        bookings: action.payload.bookings,
        loading: 'completed',
        error: null,
      };
    case LOAD_BOOKING_ERROR:
      return {
        ...state,
        loading: 'failed',
        error: action.payload.error,
      };
    case LOGOUT:
      return bookingsInitialState;
    default:
      return state;
  }
};

export default combineReducers({ authenticated, hikes, bookings });
