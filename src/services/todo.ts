import request from "@utils/request";

export function add(params) {
  return request('/api/todo/add', {method: 'POST', data: params});
}

export function queryAll() {
  return request('/api/todo/queryAll');
}
