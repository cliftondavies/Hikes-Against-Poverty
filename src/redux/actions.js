export const LOAD_HIKES = 'LOAD_HIKES';
export const LOAD_BOOKINGS = 'LOAD_BOOKINGS';
// export const UPDATE_BOOKING_STATUS = 'UPDATE_BOOKING_STATUS';
export const LOAD_HIKE_ERROR = 'LOAD_ERROR';
export const LOAD_BOOKING_ERROR = 'LOAD_BOOKING_ERROR';
export const RESET_STORE = 'RESET_STORE';

export const loadHikes = ({ hikes }) => (
  {
    type: LOAD_HIKES,
    payload: { hikes },
  }
);

export const loadBookings = ({ bookings }) => (
  {
    type: LOAD_BOOKINGS,
    payload: { bookings },
  }
);

// export const updateBookingStatus = (status) => (
//   {
//     type: UPDATE_BOOKING_STATUS,
//     payload: { status },
//   }
// );

export const loadHikeError = ({ error }) => (
  {
    type: LOAD_HIKE_ERROR,
    payload: { error },
  }
);

export const loadBookingError = ({ error }) => (
  {
    type: LOAD_BOOKING_ERROR,
    payload: { error },
  }
);

export const resetStore = () => (
  {
    type: RESET_STORE,
  }
);
