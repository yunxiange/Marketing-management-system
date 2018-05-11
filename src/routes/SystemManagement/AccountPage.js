import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../Forms/style.less';
import {
    Card,
    Button,
    Form,
    Icon,
    Col,
    Row,
    DatePicker,
    TimePicker,
    Input,
    Select,
    Popover,
  } from 'antd';

import AccountForm from './AccountForm';

const tableData = [
  {
    key: '1',
    username: 'admin',
    password: '123456',
    authority: '0',
    director: '苗阳',
  },
  {
    key: '2',
    username: 'guest',
    password: '123456',
    authority: '1',
    director: '苗阳',
  },
];



export default class AccountPage extends PureComponent {
  state = {
    width: '100%',
  };
  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  render(){
    //let { getFieldDecorator } = this.props.form;

      return(
        <PageHeaderLayout wrapperClassName={styles.advancedForm} >
          <Card title="账户管理" bordered={false}>
          {/* {getFieldDecorator('customers', { initialValue: tableData, })(<CustomerForm />)} */}
          <AccountForm  value={tableData} />
          </Card>
        </PageHeaderLayout>            
      );   
  }
}
 //export default Form.create()(CustomerMgr)