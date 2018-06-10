import { getUserList, getUserInfo, add, modify, del } from '../services/user';

export default {
  namespace: 'user',

  state: {
    loading: true,
    list: [],
    currentUser: {},
  },

  effects: {
    *fetchList(_, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
          list: [],
        },
      });
      const response = yield call(getUserList);
      yield put({
        type: 'save',
        payload: {
          loading: false,
          list: response.data.items,
        },
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getUserInfo);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *addUser({ payload }, { call, put }) {
      yield call(add, payload);
      yield put({
        type: 'save',
        payload: {
          loading: true,
          list: [],
        },
      });
      const response = yield call(getUserList, payload);
      yield put({
        type: 'save',
        payload: {
          loading: false,
          list: response.data.items,
        },
      });
    },
    *editUser({ payload }, { call, put }) {
      yield call(modify, payload);
      yield put({
        type: 'save',
        payload: {
          loading: true,
          list: [],
        },
      });
      const response = yield call(getUserList, payload);
      yield put({
        type: 'save',
        payload: {
          loading: false,
          list: response.data.items,
        },
      });
    },
    *delUser({ payload }, { call, put }) {
      yield call(del, payload);
      yield put({
        type: 'save',
        payload: {
          loading: true,
          list: [],
        },
      });
      const response = yield call(getUserList, payload);
      yield put({
        type: 'save',
        payload: {
          loading: false,
          list: response.data.items,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        loading: payload.loading,
        list: payload.list,
      };
    },
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        loading: false,
        currentUser: payload.data,
      };
    },
  },
};
