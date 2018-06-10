import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { save } from '../services/purchase';

export default {
  namespace: 'purchase',

  state: {},

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
  },

  reducers: {},
};
