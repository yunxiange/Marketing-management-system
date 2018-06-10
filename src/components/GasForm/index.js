import React, { Component } from 'react';
import { Row, Col, Form, Input, Radio, message } from 'antd';
import RangePrice from '../RangePrice';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class GasForm extends Component {
  static defaultProps = {
    gas: [],
    gasInfo: [],
  };

  state = {
    gas: [],
  };

  componentDidMount() {
    this.setInitGasInfo(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setInitGasInfo(nextProps);
  }

  setInitGasInfo = props => {
    const gasData = {};
    gasData.gas = props.gas;
    props.gas.forEach(gas => {
      gasData[gas.id] = {
        priceType: '',
        volume: '',
        fixprice: '',
        rangeprice: [],
      };
    });
    props.gasInfo.forEach(item => {
      gasData[item.gasId] = {
        volume: item.volume,
        priceType: item.priceType + '',
        fixprice: +item.priceType === 1 ? item.price : '',
        rangeprice: +item.priceType === 2 ? item.price : [],
      };
    });
    this.setState(gasData);
  };

  getGasInfo = () => {
    const { gas, ...result } = this.state;
    return result;
  };

  setGasVolume = (e, gasid, type) => {
    const value = e.target.value;
    if (type === '1' && !/^\d+(\.\d+)?$/g.test(value)) {
      message.error('气量输入为整数或者小数');
      const data = {};
      data[gasid] = {
        ...this.state[gasid],
        volume: '',
      };
      this.setState(data);
      return;
    }
    const data = {};
    data[gasid] = {
      ...this.state[gasid],
      volume: value,
    };
    this.setState(data);
  };

  setFixPrice = (e, gasid, type) => {
    const value = e.target.value;
    if (type === '1' && !/^\d+(\.\d+)?$/g.test(value)) {
      message.error('价格输入为整数或者小数');
      const data = {};
      data[gasid] = {
        ...this.state[gasid],
        fixprice: '',
      };
      return;
    }
    const data = {};
    data[gasid] = {
      ...this.state[gasid],
      fixprice: value,
    };
    this.setState(data);
  };

  setRangePrice = (price, gasid) => {
    const data = {};
    data[gasid] = {
      ...this.state[gasid],
      rangeprice: price,
    };
    this.setState(data);
  };

  changePriceType = (e, gasid) => {
    const data = {};
    const type = e.target.value;
    data[gasid] = {
      ...this.state[gasid],
      priceType: type,
    };
    this.setState(data);
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
      this.state.gas.length > 0 &&
      this.state.gas.map(gas => {
        return (
          <FormItem key={gas.id} {...formItemLayout} label={gas.name}>
            <Row gutter={8}>
              <Col span={23}>
                <Input
                  type="text"
                  value={this.state[gas.id].volume}
                  onChange={e => this.setGasVolume(e, gas.id)}
                  onBlur={e => this.setGasVolume(e, gas.id, '1')}
                />
              </Col>
              <Col span={1}>方</Col>
            </Row>
            <Row gutter={8}>
              <label>单价类别：</label>
              <RadioGroup
                onChange={e => this.changePriceType(e, gas.id)}
                value={this.state[gas.id] && this.state[gas.id].priceType}
              >
                <Radio value="1">固定价格</Radio>
                <Radio value="2">区间价格</Radio>
              </RadioGroup>
            </Row>
            {this.state[gas.id] && this.state[gas.id].priceType === '1' ? (
              <Row gutter={8}>
                <Col span={3}>
                  <label>单价：</label>
                </Col>
                <Col span={20}>
                  <Input
                    type="text"
                    value={this.state[gas.id].fixprice}
                    onChange={e => this.setFixPrice(e, gas.id)}
                    onBlur={e => this.setFixPrice(e, gas.id, '1')}
                  />
                </Col>
                <Col span={1}>元</Col>
              </Row>
            ) : this.state[gas.id] && this.state[gas.id].priceType === '2' ? (
              <RangePrice
                rangeInfo={this.state[gas.id].rangeprice}
                onChange={price => this.setRangePrice(price, gas.id)}
              />
            ) : (
              ''
            )}
          </FormItem>
        );
      })
    );
  }
}
