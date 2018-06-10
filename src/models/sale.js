import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { save, getSaleDetail, modify } from '../services/sale';

export default {
  namespace: 'sale',

  state: {
    fee: '',
    gasInfo: [],
  },

  effects: {
    *saveForm({ payload }, { call, put }) {
      const response = yield call(save, payload);
      if (response.status === 0) {
        message.success('提交成功');
        yield put(routerRedux.push('/report/basic'));
      } else {
        message.error(response.msg);
      }
    },
    *updateForm({ payload }, { call, put }) {
      const response = yield call(modify, payload);
      if (response.status === 0) {
        message.success('提交成功');
        yield put(routerRedux.push('/report/basic'));
      } else {
        message.error(response.msg);
      }
    },
    *fetchDetail({ payload }, { call, put }) {
      if (payload.customerId === '-1') {
        yield put({
          type: 'getDetail',
          payload: {
            fee: '',
            gasInfo: [],
          },
        });
        return;
      }
      const response = yield call(getSaleDetail, payload);
      yield put({
        type: 'getDetail',
        payload: response.data,
      });
    },
  },

  reducers: {
    getDetail(state, { payload }) {
      return {
        ...state,
        fee: payload.fee,
        gasInfo: payload.gasInfo,
      };
    },
  },
};
