import React, { PureComponent } from 'react';
import moment from 'moment';
import { Row, Col, Select, DatePicker, Table } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class ReportQuery extends PureComponent {
  static defaultProps = {
    customerList: [],
    loading: true,
    tableData: [],
  };

  state = {
    startDatetime: moment()
      .startOf('day')
      .unix(),
    endDatetime: moment()
      .startOf('day')
      .unix(),
    customerId: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'customer/fetchList',
    });
    this.props.dispatch({
      type: 'report/getQuery',
      payload: {
        startDatetime: this.state.startDatetime,
        endDatetime: this.state.endDatetime,
        customerId: this.state.customerId,
      },
    });
  }
  setDisableDate = value => {
    if (!value) {
      return false;
    }
    return value.valueOf() > moment().format('x');
  };

  handleDateChange = dates => {
    this.setState({
      startDatetime: dates[0].startOf('day').unix(),
      endDatetime: dates[1].startOf('day').unix(),
    });
    this.props.dispatch({
      type: 'report/getQuery',
      payload: {
        startDatetime: dates[0].startOf('day').unix(),
        endDatetime: dates[1].startOf('day').unix(),
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
      type: 'report/getQuery',
      payload: {
        startDatetime: this.state.startDatetime,
        endDatetime: this.state.endDatetime,
        customerId: value,
      },
    });
  };

  render() {
    const dataSource = [];
    let columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
    ];

    if (this.props.tableData[0]) {
      this.props.tableData[0].gas.forEach((gas, index) => {
        columns.push({
          title: gas.label,
          dataIndex: 'gas' + index,
        });
      });
    }

    this.props.tableData.forEach((item, i) => {
      const temp = {
        key: i,
        username: item.username,
        totalFee: item.totalFee,
        totalVolume: item.totalVolume,
        totalProfit: item.totalProfit,
      };
      item.gas.forEach((gas, index) => {
        temp['gas' + index] = gas.volume || 0;
      });
      dataSource.push(temp);
    });

    columns = columns.concat([
      {
        title: '管输费',
        dataIndex: 'totalFee',
      },
      {
        title: '用气量',
        dataIndex: 'totalVolume',
      },
      {
        title: '总利润',
        dataIndex: 'totalProfit',
      },
    ]);

    return (
      <PageHeaderLayout>
        <div style={{ marginBottom: '10px' }}>
          <Row gutter={8}>
            <Col span={6}>
              <span>客户名称：</span>
              <Select
                style={{ width: '150px' }}
                size="default"
                defaultValue="-1"
                onChange={this.handleSelectChange}
              >
                <Option value="-1">选择客户</Option>
                {this.props.customerList.map(customer => {
                  return (
                    <Option key={customer.id} value={customer.id}>
                      {customer.name}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={12}>
              <span>起止日期：</span>
              <RangePicker
                disabledDate={this.setDisableDate}
                defaultValue={[moment(), moment()]}
                onChange={this.handleDateChange}
              />
            </Col>
          </Row>
        </div>
        <Table loading={this.props.loading} dataSource={dataSource} columns={columns} />
      </PageHeaderLayout>
    );
  }
}

export default connect(({ customer, report }) => ({
  customerList: customer.list,
  loading: report.loading,
  tableData: report.list || [],
}))(ReportQuery);
