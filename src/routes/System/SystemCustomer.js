import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../Forms/style.less';
import CustomerForm from './CustomerForm';

class SystemCustomer extends PureComponent {
  static defaultProps = {
    customerList: [],
    loading: true,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
    this.props.dispatch({
      type: 'customer/fetchList',
    });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  delCustomer = data => {
    this.props.dispatch({
      type: 'customer/delCustomer',
      payload: {
        customerId: data,
      },
    });
  };

  addCustomer = data => {
    this.props.dispatch({
      type: 'customer/addCustomer',
      payload: data,
    });
  };

  render() {
    let tableData = [];

    tableData = this.props.customerList.map(item => {
      item.key = item.id;
      return item;
    });

    return (
      <PageHeaderLayout wrapperClassName={styles.advancedForm}>
        <Card title="客户管理" bordered={false}>
          <CustomerForm
            value={tableData}
            loading={this.props.loading}
            onDelItem={this.delCustomer}
            onAddItem={this.addCustomer}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ customer }) => ({
  customerList: customer.list,
  loading: customer.loading,
}))(SystemCustomer);
