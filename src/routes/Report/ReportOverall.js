import React, { PureComponent } from 'react';
import moment from 'moment';
import { DatePicker, Table } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

class ReportOverall extends PureComponent {
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
      type: 'report/getOverall',
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
      type: 'report/getOverall',
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
      {
        title: '气源均价',
        dataIndex: 'buyAveragePrice',
      },
      {
        title: '销售均价',
        dataIndex: 'saleAveragePrice',
      },
      {
        title: '成本',
        dataIndex: 'totalCost',
      },
      {
        title: '管输费',
        dataIndex: 'totalFee',
      },
      {
        title: '销售收入',
        dataIndex: 'totalIncome',
      },
    ];

    this.props.tableData.forEach((item, index) => {
      item.key = index;
      dataSource.push(item);
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
  tableData: report.compositeList || [],
}))(ReportOverall);
