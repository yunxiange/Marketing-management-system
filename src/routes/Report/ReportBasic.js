import React, { PureComponent } from 'react';
import moment from 'moment';
import { DatePicker, Table } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

class ReportBasic extends PureComponent {
  static defaultProps = {
    loading: true,
    tableData: [],
  };

  state = {
    datetime: moment()
      .startOf('day')
      .unix(),
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'report/getBasic',
      payload: {
        datetime: this.state.datetime,
      },
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
    this.props.dispatch({
      type: 'report/getBasic',
      payload: {
        datetime: date.startOf('day').unix(),
      },
    });
  };

  render() {
    const dataSource = [];
    const columns = [
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
        fee: item.fee,
      };
      item.gas.forEach((gas, index) => {
        temp['gas' + index] = gas.volume || 0;
      });
      dataSource.push(temp);
    });

    columns.push({
      title: '管输费单价',
      dataIndex: 'fee',
    });

    return (
      <PageHeaderLayout>
        <div style={{ marginBottom: '10px' }}>
          <span>查询日期：</span>
          <DatePicker
            disabledDate={this.setDisableDate}
            defaultValue={moment()}
            onChange={this.handleDateChange}
          />
        </div>
        <Table loading={this.props.loading} dataSource={dataSource} columns={columns} />
      </PageHeaderLayout>
    );
  }
}

export default connect(({ report }) => ({
  loading: report.loading,
  tableData: report.list || [],
}))(ReportBasic);
