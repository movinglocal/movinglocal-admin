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
  const token = localStorage.getItem('token');
  const source = localStorage.getItem('source');
  const options = {
    headers : new Headers({
      Accept: 'application/json',
      'Content-type': 'application/json',
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
        _start: (perPage * (page - 1))
      };
      if (source && resource === 'article') query['source._id'] = source;
      if (typeof params.filter.q !== undefined) {
        params.filter._q = params.filter.q;
        delete params.filter.q;
      }
      url = `${apiUrl}/${resource}?${stringify(query)}&${stringify(params.filter)}`;
      break;
    }
    case GET_ONE:
      url = `${apiUrl}/${resource}/${params.id}`;
      break;
    case CREATE:
      url = `${apiUrl}/${resource}`;
      options.method = 'POST';
      if (resource === 'article') params.data.source = source;
      if (resource === 'article') params.data.type = 'kollektive';
      options.body = JSON.stringify(params.data);
      break;
    case UPDATE:
      if (params.id === 'me') {
        params.id = params.data._id;
        params.data = {
          description: params.data.description,
          image: params.data.image
        }
      }
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
      query = params.ids.map(id => {
        if (typeof id === 'object') return stringify({_id: id.id});
        else return stringify({_id: id});
      });
      url = `${apiUrl}/${resource}?${query.join('&')}`;
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

  if (type === GET_ONE) {
    data.id = params.id;
  }

  return {data};
};
