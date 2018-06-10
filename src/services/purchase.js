import { stringify } from 'qs';
import request from '../utils/request';

export async function save(params) {
  return request(`/purchase/save?${stringify(params)}`);
}
