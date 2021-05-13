import {
  login, setLoadingStatus, setError, setHikes, setBookings, logout,
} from '../redux/actions';
import { getHikes, getBookings } from '../test/test-data';

describe('Actions', () => {
  test('Login', () => {
    const test = login();
    expect(test.type).toMatch(/LOGIN/);
  });

  test('Set loading status', () => {
    const test = setLoadingStatus(true);
    expect(test.payload.status).toBe(true);
  });

  test('Set error', () => {
    const error = { error: 'Invalid email or password' };
    const test = setError(error);
    expect(test.payload).toEqual(error);
  });

  test('Set hikes', () => {
    const hikes = getHikes();
    const test = setHikes(hikes);
    expect(test.payload.hikes).toEqual(hikes);
  });

  test('Set bookings', () => {
    const bookings = getBookings();
    const test = setBookings(bookings);
    expect(test.payload.bookings).toEqual(bookings);
  });

  test('Logout', () => {
    const test = logout();
    expect(test.type).toMatch(/LOGOUT/);
  });
});
