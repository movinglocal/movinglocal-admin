import { stringify } from 'query-string';
import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  GET_MANY,
  GET_MANY_REFERENCE,
} from 'react-admin';
import { BASE_URL, COUNT_PATH } from '../config';

const apiUrl = BASE_URL;

/**
* Maps react-admin queries to my REST API
*
* @param {string} type Request type, e.g GET_LIST
* @param {string} resource Resource name, e.g. "posts"
* @param {Object} payload Request parameters. Depends on the request type
* @returns {Promise} the Promise for a data response
*/
export default async (type, resource, params) => {
  let url = '';
  let query = {};
  const token = localStorage.getItem('token');
  const options = {
    headers : new Headers({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }),
  };
  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      query = {
        _sort: `${field}:${order}`,
        _limit: perPage,
        _start: (perPage * (page - 1)),
        //_filter: JSON.stringify(params.filter),
      };
      query.users = localStorage.getItem('user');
      url = `${apiUrl}/${resource}?${stringify(query)}`;
      break;
    }
    case GET_ONE:
      url = `${apiUrl}/${resource}/${params.id}`;
      break;
    case CREATE:
      url = `${apiUrl}/${resource}`;
      options.method = 'POST';
      params.data.users = localStorage.getItem('user');
      options.body = JSON.stringify(params.data);
      break;
    case UPDATE:
      url = `${apiUrl}/${resource}/${params.id}`;
      options.method = 'PUT';
      options.body = JSON.stringify(params.data);
      break;
    case DELETE:
      url = `${apiUrl}/${resource}/${params.id}`;
      options.method = 'DELETE';
      break;
    case GET_MANY: {
      query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      url = `${apiUrl}/${resource}?${stringify(query)}`;
      break;
    }
    case GET_MANY_REFERENCE: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      query = {
        _sort: `${field}:${order}`,
        _limit: perPage,
        _start: page * perPage -1,
        _filter: JSON.stringify({
          ...params.filter,
          [params.target]: params.id,
        }),
      };
      url = `${apiUrl}/${resource}?${stringify(query)}`;
      break;
    }
    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }

  const res = await fetch(url, options);
  const data = await res.json();
  if (type === GET_LIST) {
    const count = await fetch(`${apiUrl}/${resource}${COUNT_PATH}?${stringify(query)}`);
    const total = await count.json();
    return {data, total};
  }

  return {data};
};
