import { AUTH_LOGIN, AUTH_LOGOUT } from 'react-admin';
import { BASE_URL, AUTH_PATH } from '../config';

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request(`${BASE_URL}${AUTH_PATH}`, {
      method: 'POST',
      body: JSON.stringify({ identifier: username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    return fetch(request)
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(({ user, jwt }) => {
      localStorage.setItem('user', user.id);
      localStorage.setItem('token', jwt);
    });
  }

  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
  return Promise.resolve();
}
