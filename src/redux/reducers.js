import { combineReducers } from 'redux';
import {
  LOGIN, LOGOUT, LOAD_HIKES, LOAD_BOOKINGS, LOAD_ERROR,
} from './actions';

export const hikesInitialState = {
  hikes: [],
};

export const bookingsInitialState = {
  bookings: [],
};

export const loadingInitialState = {
  hikesLoading: 'idle',
  bookingsLoading: 'idle',
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
      };
    case LOGOUT:
      return bookingsInitialState;
    default:
      return state;
  }
};

export const loading = (state = loadingInitialState, action) => {
  switch (action.type) {
    case LOAD_HIKES:
      return {
        ...state,
        hikesLoading: 'completed',
      };
    case LOAD_BOOKINGS:
      return {
        ...state,
        bookingsLoading: 'completed',
      };
    case LOGOUT:
      return loadingInitialState;
    default:
      return state;
  }
};

export const error = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
    case LOAD_HIKES:
    case LOAD_BOOKINGS:
    case LOGOUT:
      return null;
    case LOAD_ERROR:
      return action.payload.error;
    default:
      return state;
  }
};

export default combineReducers({
  authenticated, hikes, bookings, loading, error,
});
