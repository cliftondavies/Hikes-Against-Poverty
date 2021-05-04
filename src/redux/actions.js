export const LOGIN = 'LOGIN';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const SET_ERROR = 'SET_ERROR';
export const SET_HIKES = 'SET_HIKES';
export const SET_BOOKINGS = 'SET_BOOKINGS';
export const LOGOUT = 'LOGOUT';

export const login = () => (
  {
    type: LOGIN,
  }
);

export const setLoadingStatus = (status) => (
  {
    type: SET_LOADING_STATUS,
    payload: { status },
  }
);

export const setError = ({ error }) => (
  {
    type: SET_ERROR,
    payload: { error },
  }
);

export const setHikes = (hikes) => (
  {
    type: SET_HIKES,
    payload: { hikes },
  }
);

export const setBookings = (bookings) => (
  {
    type: SET_BOOKINGS,
    payload: { bookings },
  }
);

export const logout = () => (
  {
    type: LOGOUT,
  }
);
