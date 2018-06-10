import request from '../utils/request';

export async function checkUser(params) {
  return request('/login/in', {
    method: 'POST',
    body: params,
  });
}

export async function loginOut() {
  return request('/login/out');
}
