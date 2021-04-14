import { combineReducers } from 'redux';
import {
  LOAD_HIKES, LOAD_BOOKINGS, UPDATE_BOOKING_STATUS, LOAD_HIKE_ERROR, LOAD_BOOKING_ERROR,
} from './actions';

export const hikesInitialState = {
  hikes: [],
  loading: 'idle',
  error: null,
};

export const bookingsInitialState = {
  bookings: [],
  loading: 'idle',
  newBooking: false,
  error: null,
};

export const hikes = (state = hikesInitialState, action) => {
  switch (action.type) {
    case LOAD_HIKES:
      return {
        ...state,
        hikes: action.payload.hikes,
        defaultLoading: 'completed',
        error: null,
      };
    case LOAD_HIKE_ERROR: {
      return {
        ...state,
        loading: 'failed',
        error: action.payload.error,
      };
    }
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
    case UPDATE_BOOKING_STATUS:
      return {
        ...state,
        newBooking: action.payload.status,
      };
    case LOAD_BOOKING_ERROR: {
      return {
        ...state,
        loading: 'failed',
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({ hikes, bookings });
