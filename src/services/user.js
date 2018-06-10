import { stringify } from 'qs';
import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function getUserList() {
  return request('/user/getUserList');
}

export async function getUserInfo() {
  return request('/user/getUserInfo');
}

export async function add(params) {
  return request(`/user/add?${stringify(params)}`);
}

export async function modify(params) {
  return request(`/user/modify?${stringify(params)}`);
}

export async function del(params) {
  return request(`/user/del?${stringify(params)}`);
}
