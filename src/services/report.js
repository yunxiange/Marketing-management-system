import { stringify } from 'qs';
import request from '../utils/request';

export async function basic(params) {
  return request(`/report/basic?${stringify(params)}`);
}

export async function overall(params) {
  return request(`/report/overall?${stringify(params)}`);
}

export async function query(params) {
  return request(`/report/query?${stringify(params)}`);
}
