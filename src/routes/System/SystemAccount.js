import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import AccountForm from './AccountForm';
import styles from '../Forms/style.less';

class SystemAccount extends PureComponent {
  static defaultProps = {
    userList: [],
    loading: true,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
    this.props.dispatch({
      type: 'user/fetchList',
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  editUser = user => {
    this.props.dispatch({
      type: 'user/editUser',
      payload: {
        userId: user.id,
        username: user.username,
        password: user.password,
        auth: user.auth,
        adminitor: user.adminitor,
      },
    });
  };

  delUser = data => {
    this.props.dispatch({
      type: 'user/delUser',
      payload: {
        userId: data,
      },
    });
  };

  saveUser = user => {
    let type = 'user/addUser';
    if (user.id) {
      type = 'user/editUser';
    }
    this.props.dispatch({
      type,
      payload: {
        userId: user.id,
        username: user.username,
        password: user.password,
        auth: user.auth,
        adminitor: user.adminitor,
      },
    });
  };

  render() {
    let tableData = [];
    tableData = this.props.userList.map(item => {
      item.key = item.id;
      return item;
    });

    return (
      <PageHeaderLayout wrapperClassName={styles.advancedForm}>
        <Card title="账户管理" bordered={false}>
          <AccountForm
            value={tableData}
            loading={this.props.loading}
            onEditItem={this.saveUser}
            onDelItem={this.delUser}
            onAddItem={this.saveUser}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ user }) => ({
  userList: user.list,
  loading: user.loading,
}))(SystemAccount);
