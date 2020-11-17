import request from "@utils/request";

export function add(params) {
  return request('/api/g6/add', {method: 'POST', data: params});
}

export function queryAll() {
  return request('/api/g6/queryAll');
}
