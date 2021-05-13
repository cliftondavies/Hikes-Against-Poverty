import {
  hikesInitialState, bookingsInitialState, authStatus, loadingStatus, error, hikes, bookings,
} from '../redux/reducers';
import {
  login, setLoadingStatus, setError, setHikes, setBookings, logout,
} from '../redux/actions';
import { getHikes, getBookings } from '../test/test-data';

describe('Reducers', () => {
  describe('Authentication status reducer', () => {
    test('when action equals login', () => {
      const action = login();
      const test = authStatus(false, action);
      expect(test).toBe(true);
    });

    test('when action equals logout', () => {
      const action = logout();
      const test = authStatus(true, action);
      expect(test).toBe(false);
    });
  });

  test('Loading status reducer', () => {
    const action = setLoadingStatus(true);
    const test = loadingStatus(false, action);
    expect(test).toBe(true);
  });

  test('Error reducer', () => {
    const testError = { error: 'Invalid email or password' };
    const action = setError(testError);
    const test = error(null, action);
    expect(test).toMatch(/Invalid email or password/);
  });

  test('Hikes reducer', () => {
    const testHike = getHikes();
    const action = setHikes(testHike);
    const test = hikes(hikesInitialState, action);
    expect(test).toEqual({ hikes: testHike });
  });

  test('Bookings reducer', () => {
    const testBooking = getBookings();
    const action = setBookings(testBooking);
    const test = bookings(bookingsInitialState, action);
    expect(test).toEqual({ bookings: testBooking });
  });
});
