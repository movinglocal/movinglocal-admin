import { stringify } from 'query-string';
import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  DELETE_MANY,
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

  // @TODO this is a workaround to filter only user's own resources
  const users = localStorage.getItem('user');
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
      if (params.filter.q) {
        params.filter._q = params.filter.q;
        delete params.filter.q;
      }
      query = {
        _sort: `${field}:${order}`,
        _limit: perPage,
        _start: (perPage * (page - 1))
      };
      if (users) query.users = users;
      url = `${apiUrl}/${resource}?${stringify(query)}&${stringify(params.filter)}`;
      break;
    }
    case GET_ONE:
      url = `${apiUrl}/${resource}/${params.id}`;
      break;
    case CREATE:
      url = `${apiUrl}/${resource}`;
      options.method = 'POST';
      params.data.users = users;
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
    case DELETE_MANY:
      url = `${apiUrl}/content-manager/explorer/deleteAll/${resource}?${stringify(params.ids)}&source=content-manager`;
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

  if (res.status === 401) throw res;
  const data = await res.json();

  if (type === GET_LIST) {
    const count = await fetch(`${apiUrl}/${resource}${COUNT_PATH}?${stringify(query)}`);
    const total = await count.json();
    if (total.statusCode === 404) return {data, total: 0}
    return {data, total};
  }

  if (type === DELETE_MANY) {
    return {data: params.ids}
  }

  return {data};
};
