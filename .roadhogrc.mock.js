import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'POST /login/in': (req, res) => {
    res.status(200).send({
      status: 0,
      msg: '',
      data: {
        type: 2,
      },
    });
  },
  'GET /customer/getCustomerList': (req, res) => {
    res.status(200).send({
      status: 0,
      msg: '',
      data: {
        items: [
          {
            id: '1',
            name: '客户1',
            distance: 23443,
          },
          {
            id: '2',
            name: '客户2',
            distance: 34643,
          },
        ],
        total: 2,
      },
    });
  },
  'GET /gas/getGasList': (req, res) => {
    res.status(200).send({
      status: 0,
      msg: '',
      data: {
        items: [
          {
            id: '1',
            name: '天然气A',
          },
          {
            id: '2',
            name: '天然气B',
          },
          {
            id: '3',
            name: '天然气C',
          },
        ],
        total: 3,
      },
    });
  },
  'GET /user/getUserList': (req, res) => {
    res.status(200).send({
      status: 0,
      msg: '',
      data: {
        items: [
          {
            id: '1',
            username: '张三',
            password: 'xxxxx',
            auth: '普通权限',
            adminitor: '系统',
          },
          {
            id: '5',
            username: '李四',
            password: 'xxxxx',
            auth: '普通权限',
            adminitor: '',
          },
        ],
        total: 2,
      },
    });
  },
  'GET /user/getUserInfo': (req, res) => {
    res.status(200).send({
      status: 0,
      msg: '',
      data: {
        name: '你最美',
      },
    });
  },
  'GET /sale/save': (req, res) => {
    res.status(200).send({
      status: 0,
      msg: '',
      data: '126',
    });
  },
  'GET /sale/getSaleDetail': (req, res) => {
    res.status(200).send({
      status: 0,
      msg: '',
      data: {
        fee: 2,
        gasInfo: [
          {
            gasId: 1,
            volume: 100,
            priceType: 1,
            price: 2.5,
          },
          {
            gasId: 2,
            volume: 104,
            priceType: 2,
            price: [{ start: 1, end: 50, price: 2 }, { start: 51, end: 100, price: 2.5 }],
          },
        ],
      },
    });
  },
  'GET /purchase/save': (req, res) => {
    res.status(200).send({
      status: 0,
      msg: '',
      data: '12',
    });
  },
  'GET /report/basic': (req, res) => {
    res.status(200).send({
      status: 0,
      msg: '',
      data: [
        {
          username: 'A',
          gas: [
            {
              label: '天然气A',
              volume: 100,
            },
            {
              label: '天然气B',
              volume: 100,
            },
            {
              label: '天然气C',
              volume: 0,
            },
          ],
          fee: '2',
        },
        {
          username: 'B',
          gas: [
            {
              label: '天然气A',
              volume: 100,
            },
            {
              label: '天然气B',
              volume: 0,
            },
            {
              label: '天然气C',
              volume: 0,
            },
          ],
          fee: '3',
        },
      ],
    });
  },
  'GET /report/overall': (req, res) => {
    res.status(200).send({
      status: 0,
      msg: '',
      data: [
        {
          username: 'A',
          buyAveragePrice: 2.2525,
          saleAveragePrice: 2.2525,
          totalCost: 450.5,
          totalFee: 400,
          totalIncome: 450.5,
        },
        {
          username: 'B',
          buyAveragePrice: 2.5,
          saleAveragePrice: 2.5,
          totalCost: 250,
          totalFee: 300,
          totalIncome: 250,
        },
        {
          username: 'C',
          buyAveragePrice: 2.5,
          saleAveragePrice: 2.5,
          totalCost: 250,
          totalFee: 300,
          totalIncome: 250,
        },
      ],
    });
  },
  'GET /report/query': (req, res) => {
    res.status(200).send({
      status: 0,
      msg: '',
      data: [
        {
          username: 'A',
          gas: [
            {
              label: '天然气A',
              volume: 100,
            },
            {
              label: '天然气B',
              volume: 100,
            },
            {
              label: '天然气C',
              volume: 0,
            },
          ],
          totalFee: 400,
          totalVolume: 200,
          totalProfit: 0,
        },
        {
          username: 'B',
          gas: [
            {
              label: '天然气A',
              volume: 100,
            },
            {
              label: '天然气B',
              volume: 0,
            },
            {
              label: '天然气C',
              volume: 0,
            },
          ],
          totalFee: 300,
          totalVolume: 100,
          totalProfit: 0,
        },
      ],
    });
  },
};

export default (noProxy ? {} : delay(proxy, 1000));
