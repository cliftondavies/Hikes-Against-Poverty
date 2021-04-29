export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOAD_HIKES = 'LOAD_HIKES';
export const LOAD_BOOKINGS = 'LOAD_BOOKINGS';
export const LOAD_ERROR = 'LOAD_ERROR';

export const login = () => (
  {
    type: LOGIN,
  }
);

export const logout = () => (
  {
    type: LOGOUT,
  }
);

export const loadHikes = (hikes) => (
  {
    type: LOAD_HIKES,
    payload: { hikes },
  }
);

export const loadBookings = (bookings) => (
  {
    type: LOAD_BOOKINGS,
    payload: { bookings },
  }
);

export const loadError = ({ error }) => (
  {
    type: LOAD_ERROR,
    payload: { error },
  }
);
