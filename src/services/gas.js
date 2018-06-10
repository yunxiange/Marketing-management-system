import request from '../utils/request';

export async function getGasList() {
  return request('/gas/getGasList');
}
