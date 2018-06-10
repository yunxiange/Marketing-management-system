import { basic, overall, query } from '../services/report';

export default {
  namespace: 'report',

  state: {
    loading: false,
    list: [],
    compositeList: [],
  },

  effects: {
    *getBasic({ payload }, { call, put }) {
      yield put({
        type: 'getData',
        payload: {
          loading: true,
          list: [],
        },
      });
      const response = yield call(basic, payload);
      yield put({
        type: 'getData',
        payload: {
          loading: true,
          list: [],
        },
      });
      yield put({
        type: 'getData',
        payload: {
          loading: false,
          list: response.data,
        },
      });
    },
    *getOverall({ payload }, { call, put }) {
      yield put({
        type: 'getData',
        payload: {
          loading: true,
          list: [],
          compositeList: [],
        },
      });
      const response = yield call(overall, payload);
      yield put({
        type: 'getData',
        payload: {
          loading: false,
          list: [],
          compositeList: response.data,
        },
      });
    },
    *getQuery({ payload }, { call, put }) {
      yield put({
        type: 'getData',
        payload: {
          loading: true,
          list: [],
          compositeList: [],
        },
      });
      const response = yield call(query, payload);
      yield put({
        type: 'getData',
        payload: {
          loading: false,
          list: response.data,
          compositeList: [],
        },
      });
    },
  },

  reducers: {
    getData(state, { payload }) {
      return {
        ...state,
        loading: payload.loading,
        list: payload.list,
        compositeList: payload.compositeList,
      };
    },
  },
};
