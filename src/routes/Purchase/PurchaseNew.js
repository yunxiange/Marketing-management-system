import React, { PureComponent } from 'react';
import moment from 'moment';
import { Row, Col, Card, Form, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import GasForm from '../../components/GasForm';

class PurchaseNew extends PureComponent {
  static defaultProps = {
    gasList: [],
  };

  state = {};

  componentDidMount() {
    this.props.dispatch({
      type: 'gas/fetchList',
    });
  }

  handleReset = () => {
    this.props.dispatch(routerRedux.push('/report/basic'));
  };

  submitForm = () => {
    const gasInfo = this.gas.getGasInfo();
    const params = {
      datetime: moment()
        .startOf('day')
        .unix(),
    };
    let index = 0;
    for (const key in gasInfo) {
      if (!gasInfo.hasOwnProperty(key)) {
        continue;
      }

      const paramKey = 'gasInfo[' + index + ']';
      const priceType = gasInfo[key]['priceType'];

      params[paramKey + '[gasId]'] = key;
      params[paramKey + '[volume]'] = gasInfo[key]['volume'];
      params[paramKey + '[priceType]'] = priceType;
      params[paramKey + '[price]'] =
        priceType === '2' ? JSON.stringify(gasInfo[key]['rangeprice']) : gasInfo[key]['fixprice'];

      index++;
    }

    this.props.dispatch({
      type: 'purchase/saveForm',
      payload: params,
    });
  };

  render() {
    return (
      <PageHeaderLayout>
        <div>
          <span>采购日期：</span>
          <DatePicker disabled defaultValue={moment()} />
        </div>
        <Card style={{ marginTop: '10px' }}>
          <Form>
            <GasForm
              gas={this.props.gasList}
              ref={gas => {
                this.gas = gas;
              }}
            />
            <Row>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" onClick={this.submitForm}>
                  保存
                </Button>
                <Button style={{ marginLeft: 20 }} onClick={this.handleReset}>
                  取消
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ gas }) => ({
  gasList: gas.list,
}))(PurchaseNew);
