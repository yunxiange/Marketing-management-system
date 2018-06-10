import { stringify } from 'qs';
import request from '../utils/request';

export async function getCustomerList() {
  return request('/customer/getCustomerList');
}

export async function addCustomer(params) {
  return request(`/customer/addCustomer?${stringify(params)}`);
}

export async function delCustomer(params) {
  return request(`/customer/delCustomer?${stringify(params)}`);
}
