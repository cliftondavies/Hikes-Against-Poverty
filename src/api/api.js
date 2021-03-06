import {
  setLoadingStatus, setError, setHikes, setBookings,
} from '../redux/actions';

export const getHikes = ({
  accessToken, uid, client, tokenType, expiry,
}) => async (dispatch, getState) => {
  try {
    const url = 'https://h-a-p.herokuapp.com/hikes';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'access-token': accessToken,
        uid,
        client,
        'token-type': tokenType,
        expiry,
      },
    });
    if (!response.ok) { throw new Error('Response status was not ok'); }

    const responseBody = await response.json();

    if (getState().loadingStatus) { dispatch(setLoadingStatus(false)); }

    dispatch(setHikes(responseBody));
    dispatch(setError({ error: null }));
  } catch (error) {
    dispatch(setError({ error: error.message }));
  }
};

export const userBookings = ({
  accessToken, uid, client, tokenType, expiry,
}) => async (dispatch, getState) => {
  try {
    const url = 'https://h-a-p.herokuapp.com/bookings';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'access-token': accessToken,
        uid,
        client,
        'token-type': tokenType,
        expiry,
      },
    });

    if (!response.ok) { throw new Error('Response status was not ok'); }

    const responseBody = await response.json();

    if (getState().loadingStatus) { dispatch(setLoadingStatus(false)); }

    dispatch(setBookings(responseBody));
    dispatch(setError({ error: null }));
  } catch (error) {
    dispatch(setError({ error: error.message }));
  }
};

export const signUp = async (signUpParams) => {
  try {
    const url = 'https://h-a-p.herokuapp.com/auth';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpParams),
    });

    if (!response.ok) { throw new Error('Response status was not ok'); }

    const responseBody = await response.json();
    const accessToken = response.headers.get('access-token');
    const uid = response.headers.get('uid');
    const client = response.headers.get('client');
    const tokenType = response.headers.get('token-type');
    const expiry = response.headers.get('expiry');

    return {
      user: responseBody,
      authentication: {
        accessToken, uid, client, tokenType, expiry,
      },
    };
  } catch (error) {
    return error;
  }
};

export const signIn = async (signInParams) => {
  try {
    const url = 'https://h-a-p.herokuapp.com/auth/sign_in';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signInParams),
    });

    if (!response.ok) { throw new Error('Response status was not ok'); }

    const responseBody = await response.json();
    const accessToken = response.headers.get('access-token');
    const uid = response.headers.get('uid');
    const client = response.headers.get('client');
    const tokenType = response.headers.get('token-type');
    const expiry = response.headers.get('expiry');

    return {
      user: responseBody,
      authentication: {
        accessToken, uid, client, tokenType, expiry,
      },
    };
  } catch (error) {
    return error;
  }
};

export const signOut = async ({ uid, client, accessToken }) => {
  try {
    const url = 'https://h-a-p.herokuapp.com/auth/sign_out';
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        uid,
        client,
        'access-token': accessToken,
      },
    });

    if (!response.ok) { throw new Error('Response status was not ok'); }

    return response.json();
  } catch (error) {
    return error;
  }
};

export const book = (id, bookingParams, {
  accessToken, uid, client, tokenType, expiry,
}) => async (dispatch, getState) => {
  try {
    const url = `https://h-a-p.herokuapp.com/hikes/${id}/appointments`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
        uid,
        client,
        'token-type': tokenType,
        expiry,
      },
      body: JSON.stringify(bookingParams),
    });

    if (!response.ok) { throw new Error('Response status was not ok'); }

    const responseBody = await response.json();

    if (getState().loadingStatus) { dispatch(setLoadingStatus(false)); }

    dispatch(setBookings(responseBody));
    dispatch(setError({ error: null }));
  } catch (error) {
    dispatch(setError({ error: error.message }));
  }
};
