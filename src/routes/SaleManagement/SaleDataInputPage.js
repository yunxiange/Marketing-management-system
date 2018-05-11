import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import {Table} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';


export default class SaleDataInputPage extends PureComponent {
    
      render() {
        const columns = [
          {
            title: '用户名',
            dataIndex: 'customerName',
          },
          {
            title: 'A种气源',
            dataIndex: 'AGasSrc',
          },
          {
            title: 'B种气源',
            dataIndex: 'BGasSrc',
          },
          {
            title: 'C种气源',
            dataIndex: 'CGasSrc',
          },
          {
            title: 'D种气源',
            dataIndex: 'DGasSrc',
          },
          {
            title: 'E种气源',
            dataIndex: 'EGasSrc',
          },
          {
            title: '管输费',
            dataIndex: 'pipesRate',
          }, 
          {
            title: '用气量',
            dataIndex: 'usedGas',
          },
          {
            title: '总利润',
            dataIndex: 'sumProfit',
          }, 
        ];

        const dataSource = [{
          key: '1',
          customerName: '客户1',
          AGasSrc: 1,
          BGasSrc: 1,
          CGasSrc: 1,
          DGasSrc: 1,
          EGasSrc: 1,
          pipesRate: 1,
          usedGas: 1,
          sumProfit: 1
        }, {
          key: '2',
          customerName: '客户2',
          AGasSrc: 2,
          BGasSrc: 2,
          CGasSrc: 2,
          DGasSrc: 2,
          EGasSrc: 2,
          pipesRate: 2,
          usedGas: 2,
          sumProfit: 2
        }];

        return (
          <PageHeaderLayout>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
        </PageHeaderLayout>
        );
      }
}