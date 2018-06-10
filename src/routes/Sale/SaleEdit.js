import React, { PureComponent } from 'react';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import GasForm from '../../components/GasForm';

const FormItem = Form.Item;
const Option = Select.Option;

class SaleEdit extends PureComponent {
  static defaultProps = {
    customerList: [],
  };

  state = {
    datetime: moment()
      .startOf('day')
      .unix(),
    customerId: '-1',
    fee: '',
    gasInfo: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'customer/fetchList',
    });
    this.props.dispatch({
      type: 'gas/fetchList',
    });
    this.props.dispatch({
      type: 'sale/fetchDetail',
      payload: {
        datetime: this.state.datetime,
        customerId: this.state.customerId,
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fee: nextProps.fee,
      gasInfo: nextProps.gasInfo,
    });
  }

  setDisableDate = value => {
    if (!value) {
      return false;
    }
    return value.valueOf() > moment().format('x');
  };

  handleDateChange = date => {
    this.setState({
      datetime: date.startOf('day').unix(),
    });
    if (this.state.customerId === '-1') {
      return;
    }
    this.props.dispatch({
      type: 'sale/fetchDetail',
      payload: {
        datetime: date.startOf('day').unix(),
        customerId: this.state.customerId,
      },
    });
  };

  handleSelectChange = value => {
    this.setState({
      customerId: value,
    });
    if (value === '-1') {
      return;
    }
    this.props.dispatch({
      type: 'sale/fetchDetail',
      payload: {
        datetime: this.state.datetime,
        customerId: value,
      },
    });
  };

  handleFeeChange = (e, type) => {
    const value = e.target.value;
    if (type === '1' && !/^\d+(\.\d+)?$/g.test(value)) {
      message.error('管输费输入为整数或者小数');
      this.setState({
        fee: '',
      });
      return;
    }
    this.setState({
      fee: value,
    });
  };

  handleReset = () => {
    this.props.dispatch(routerRedux.push('/report/basic'));
  };

  getPrice = gasInfo => {
    this.setState({
      gasInfo,
    });
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
      type: 'sale/updateForm',
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
          <DatePicker
            disabledDate={this.setDisableDate}
            defaultValue={moment()}
            onChange={this.handleDateChange}
          />
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
                  <Input
                    type="text"
                    value={this.state.fee}
                    onChange={this.handleFeeChange}
                    onBlur={e => this.handleFeeChange(e, '1')}
                  />
                </Col>
                <Col span={1}>元</Col>
              </Row>
            </FormItem>
            <GasForm
              gas={this.props.gasList}
              gasInfo={this.state.gasInfo}
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

export default connect(({ customer, gas, sale }) => ({
  customerList: customer.list,
  gasList: gas.list,
  fee: sale.fee,
  gasInfo: sale.gasInfo,
}))(SaleEdit);
