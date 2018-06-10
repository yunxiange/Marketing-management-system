import { getGasList } from '../services/gas';

export default {
  namespace: 'gas',
  state: {
    list: [],
  },
  effects: {
    *fetchList(_, { call, put }) {
      const response = yield call(getGasList);
      yield put({
        type: 'getGasList',
        payload: {
          list: response.data.items,
        },
      });
    },
  },
  reducers: {
    getGasList(state, { payload }) {
      return {
        ...state,
        list: payload.list,
      };
    },
  },
};
