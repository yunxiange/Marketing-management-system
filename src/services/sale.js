import { stringify } from 'qs';
import request from '../utils/request';

export async function save(params) {
  return request(`/sale/save?${stringify(params)}`);
}

export async function getSaleDetail(params) {
  return request(`/sale/getSaleDetail?${stringify(params)}`);
}

export async function modify(params) {
  return request(`/sale/modify?${stringify(params)}`);
}
