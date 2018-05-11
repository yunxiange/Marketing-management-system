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

import CustomerForm from './CustomerForm';

const tableData = [
  {
    key: '1',
    name: '客户1',
    distance: 100,
  },
  {
    key: '2',
    name: '客户2',
    distance: 200,
  },
  {
    key: '3',
    name: '客户3',
    distance: 300,
  },
];



export default class CustomerPage extends PureComponent {
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
          <Card title="客户管理" bordered={false}>
          {/* {getFieldDecorator('customers', { initialValue: tableData, })(<CustomerForm />)} */}
          <CustomerForm  value={tableData} />
          </Card>
        </PageHeaderLayout>            
      );   
  }
}
 //export default Form.create()(CustomerMgr)