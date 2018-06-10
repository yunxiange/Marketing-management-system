import { routerRedux } from 'dva/router';
import { checkUser, loginOut } from '../services/login';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    currentAuthority: 'guest',
    // status指代登录状态，true已登录false未登录
    status: false,
    // 已登录状态下是否正常，0正常1不正常，默认正常
    type: 0,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(checkUser, payload);
      const currentAuthority =
        +response.status === 0 ? (+response.data.type === 2 ? 'admin' : 'user') : 'guest';
      yield put({
        type: 'changeLoginStatus',
        payload: {
          currentAuthority,
          status: true,
          type: response.status,
        },
      });
      // Login successfully
      if (response.status === 0) {
        reloadAuthorized(currentAuthority);
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { call, put, select }) {
      yield call(loginOut);
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized('guest');
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        currentAuthority: payload.currentAuthority,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
