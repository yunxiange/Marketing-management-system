import React, { PureComponent } from 'react';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import GasForm from '../../components/GasForm';

const FormItem = Form.Item;
const Option = Select.Option;

class SaleNew extends PureComponent {
  static defaultProps = {
    customerList: [],
    gasList: [],
  };

  state = {
    customerId: '',
    fee: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'customer/fetchList',
    });
    this.props.dispatch({
      type: 'gas/fetchList',
    });
  }

  handleSelectChange = value => {
    this.setState({
      customerId: value,
    });
  };

  handleFeeChange = e => {
    const value = e.target.value;
    if (!/^\d+(\.\d+)?$/g.test(value)) {
      message.error('管输费输入为整数或者小数');
      return;
    }
    this.setState({
      fee: value,
    });
  };

  handleReset = () => {
    this.props.dispatch(routerRedux.push('/report/basic'));
  };

  submitForm = () => {
    const gasInfo = this.gas.getGasInfo();
    const params = {
      datetime: moment()
        .startOf('day')
        .unix(),
      customerId: this.state.customerId,
      fee: this.state.fee,
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
      type: 'sale/saveForm',
      payload: params,
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    return (
      <PageHeaderLayout>
        <div>
          <span>售卖日期：</span>
          <DatePicker disabled defaultValue={moment()} />
        </div>
        <Card style={{ marginTop: '10px' }}>
          <Form>
            <FormItem {...formItemLayout} label="用户名称">
              <Select size="default" defaultValue="-1" onChange={this.handleSelectChange}>
                <Option value="-1">选择客户</Option>
                {this.props.customerList.map(customer => {
                  return (
                    <Option key={customer.id} value={customer.id}>
                      {customer.name}
                    </Option>
                  );
                })}
              </Select>
            </FormItem>
            <FormItem {...formItemLayout} label="管输费单价">
              <Row gutter={8}>
                <Col span={23}>
                  <Input type="text" onBlur={this.handleFeeChange} />
                </Col>
                <Col span={1}>元</Col>
              </Row>
            </FormItem>
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

export default connect(({ customer, gas }) => ({
  customerList: customer.list,
  gasList: gas.list,
}))(SaleNew);
