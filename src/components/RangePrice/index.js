import React, { Component } from 'react';
import { Row, Col, Input, Icon, Button, message } from 'antd';

export default class RangePrice extends Component {
  static defaultProps = {
    rangeInfo: [],
  };

  state = {
    range: [],
  };

  componentDidMount() {
    this.setInitRange(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setInitRange(nextProps);
  }

  setInitRange = props => {
    const result = [];
    props.rangeInfo.forEach(range => {
      const item = {
        label: '区间' + (result.length + 1),
        start: range.start,
        end: range.end,
        price: range.price,
      };
      result.push(item);
    });
    this.setState({
      range: result,
    });
  };

  getRange = () => {
    const range = this.state.range.map(rangeItem => {
      return {
        start: rangeItem.start,
        end: rangeItem.end,
        price: rangeItem.price,
      };
    });

    this.props.onChange(range);
  };

  add = () => {
    const len = this.state.range.length;
    const range = this.state.range;
    range.push({
      label: '区间' + (len + 1),
    });

    this.setState({
      range,
    });
  };

  remove = item => {
    const range = this.state.range;

    range.forEach((r, index) => {
      if (r.label === item.label) {
        range.splice(index, 1);
      }
    });

    range.forEach((r, index) => {
      range[index].label = '区间' + (index + 1);
    });

    this.setState({ range }, () => {
      this.getRange();
    });
  };

  setStartValue = (e, item) => {
    const range = this.state.range.map(rangeItem => {
      if (rangeItem.label === item.label) {
        rangeItem.start = e.target.value;
      }
      return rangeItem;
    });
    this.setState({ range }, () => {
      this.getRange();
    });
  };

  startRangeChange = (e, item) => {
    if (!/^\d+(\.\d+)?$/g.test(e.target.value)) {
      message.error('区间起始距离输入为整数或者小数');
      return;
    }
    if (item.end && e.target.value - item.end >= 0) {
      message.error('区间起始距离不能大于结束距离');
      return;
    }
    const range = this.state.range.map(rangeItem => {
      if (rangeItem.label === item.label) {
        rangeItem.start = e.target.value;
      }
      return rangeItem;
    });
    this.setState({ range }, () => {
      this.getRange();
    });
  };

  setEndValue = (e, item) => {
    const range = this.state.range.map(rangeItem => {
      if (rangeItem.label === item.label) {
        rangeItem.end = e.target.value;
      }
      return rangeItem;
    });
    this.setState({ range }, () => {
      this.getRange();
    });
  };

  endRangeChange = (e, item) => {
    if (!/^\d+(\.\d+)?$/g.test(e.target.value)) {
      message.error('区间结束距离输入为整数或者小数');
      return;
    }
    if (e.target.value - item.start <= 0) {
      message.error('区间结束距离要大于起始距离');
      return;
    }
    const range = this.state.range.map(rangeItem => {
      if (rangeItem.label === item.label) {
        rangeItem.end = e.target.value;
      }
      return rangeItem;
    });
    this.setState({ range }, () => {
      this.getRange();
    });
  };

  setPriceValue = (e, item) => {
    const range = this.state.range.map(rangeItem => {
      if (rangeItem.label === item.label) {
        rangeItem.price = e.target.value;
      }
      return rangeItem;
    });
    this.setState({ range }, () => {
      this.getRange();
    });
  };

  priceChange = (e, item) => {
    if (!/^\d+(\.\d+)?$/g.test(e.target.value)) {
      message.error('区间价格输入为整数或者小数');
      return;
    }
    const range = this.state.range.map(rangeItem => {
      if (rangeItem.label === item.label) {
        rangeItem.price = e.target.value;
      }
      return rangeItem;
    });
    this.setState({ range }, () => {
      this.getRange();
    });
  };

  render() {
    return (
      <div>
        {this.state.range.length > 0 &&
          this.state.range.map(item => {
            return (
              <div key={item.label}>
                <Row>
                  <Col span={3}>
                    <label>{item.label}：</label>
                  </Col>
                  <Col span={5}>
                    <Input
                      type="text"
                      value={item.start}
                      onBlur={e => this.startRangeChange(e, item)}
                      onChange={e => this.setStartValue(e, item)}
                    />
                  </Col>
                  <Col span={1} style={{ textAlign: 'center' }}>
                    到
                  </Col>
                  <Col span={5}>
                    <Input
                      type="text"
                      value={item.end}
                      onBlur={e => this.endRangeChange(e, item)}
                      onChange={e => this.setEndValue(e, item)}
                    />
                  </Col>
                  <Col span={1} style={{ textAlign: 'center' }}>
                    方
                  </Col>
                  <Col span={5}>
                    <Input
                      type="text"
                      value={item.price}
                      onBlur={e => this.priceChange(e, item)}
                      onChange={e => this.setPriceValue(e, item)}
                    />
                  </Col>
                  <Col span={1} style={{ textAlign: 'center' }}>
                    元
                  </Col>
                  <Col>
                    {this.state.range.length > 1 ? (
                      <Icon
                        style={{ cursor: 'pointer' }}
                        type="minus-circle-o"
                        disabled={this.state.range.length === 1}
                        onClick={() => this.remove(item)}
                      />
                    ) : null}
                  </Col>
                </Row>
              </div>
            );
          })}
        <Button type="dashed" onClick={this.add} style={{ width: '84%' }}>
          <Icon type="plus" /> 新增区间
        </Button>
      </div>
    );
  }
}
