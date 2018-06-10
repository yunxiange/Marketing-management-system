import { getCustomerList, addCustomer, delCustomer } from '../services/customer';

export default {
  namespace: 'customer',

  state: {
    loading: true,
    list: [],
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
          list: [],
        },
      });
      const response = yield call(getCustomerList);
      yield put({
        type: 'save',
        payload: {
          loading: false,
          list: response.data.items,
        },
      });
    },

    *delCustomer({ payload }, { call, put }) {
      yield call(delCustomer, payload);
      const response = yield call(getCustomerList);
      yield put({
        type: 'save',
        payload: {
          loading: false,
          list: response.data.items,
        },
      });
    },

    *addCustomer({ payload }, { call, put }) {
      yield call(addCustomer, payload);
      const response = yield call(getCustomerList);
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
  },
};
