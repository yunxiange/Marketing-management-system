import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, Select, message, Popconfirm, Divider} from 'antd';
import styles from '../Forms/style.less';

const { Option } = Select;

export default class AccountForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: props.loading
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
        loading: nextProps.loading
      });
    }
  }
  getRowByKey(key, newData) {
    return (newData || this.state.data).filter(item => item.key === key)[0];
  }
  index = 0;
  cacheOriginData = {};
  toggleEditable = (e, key) => {
    e.preventDefault();
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };
  remove(key) {
    const newData = this.state.data.filter(item => item.key !== key);
    this.setState({ data: newData });
    this.props.onDelItem(key);
  }
  newCustomer = () => {
    const newData = this.state.data.map(item => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      username: '',
      password: '',
      auth: '1',
      adminitor: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };
  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }
  handleFieldChange(e, fieldName, key) {
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }   
  }
  handleSelectChange(value, fieldName, key) {
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = value;
      this.setState({ data: newData });
    }
  }
  saveRow(e, key) {
    e.persist();
    if (this.clickedCancel) {
      this.clickedCancel = false;
      return;
    }
    const target = this.getRowByKey(key) || {};
    if (!target.username || !target.password || !target.auth) {
      message.error('请填写完整账户信息。');
      e.target.focus();
      this.setState({
        loading: false,
      });
      return;
    }
    delete target.isNew;
    this.toggleEditable(e, key);
    this.props.onAddItem(target);
  }
  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const newData = this.state.data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData });
    this.clickedCancel = false;
  }
  render() {
    const columns = [
      {
        title: '账户',
        dataIndex: 'username',
        key: 'username',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input value={text} autoFocus onChange={e => this.handleFieldChange(e, 'username', record.key)} onKeyPress={e => this.handleKeyPress(e, record.key)} placeholder="账户" />
            );
          }
          return text;
        },
      },
      {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input type='text' value={text} onChange={e => this.handleFieldChange(e, 'password', record.key)} onKeyPress={e => this.handleKeyPress(e, record.key)} placeholder="密码" />
            );
          }
          return <Input type='password' value={text} disabled />;
        },
      },
      {
        title: '账户权限',
        dataIndex: 'auth',
        key: 'authority',
        width: '20%',
        render: (text, record) => {
          return (
            <Select placeholder="账户权限" defaultValue={text} onChange={(value)=>{this.handleSelectChange(value, 'auth', record.key)}} disabled={!record.editable}>
              <Option value="1">普通权限</Option>
              <Option value="2">管理权限</Option>
            </Select>
          );
        },
      },
      {
        title: '负责人',
        dataIndex: 'adminitor',
        key: 'director',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
                <Input value={text} onChange={e => this.handleFieldChange(e, 'adminitor', record.key)} onKeyPress={e => this.handleKeyPress(e, record.key)} placeholder="负责人" />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          if (!!record.editable && this.state.loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    return (
      <Fragment>
        <Table loading={this.state.loading} columns={columns} dataSource={this.state.data} pagination={false} rowClassName={record => { return record.editable ?  styles.editable : ''; }} />
        <Button style={{ width: '100%', marginTop: 16, marginBottom: 8 }} type="dashed" onClick={this.newCustomer}  icon="plus" >
          新增账户
        </Button>
      </Fragment>
    );
  }
}