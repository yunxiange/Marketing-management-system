import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '数据列表',
    icon: 'form',
    path: 'sale',
    children: [
      {
        name: '数据录入',
        path: 'new',
      },
      {
        name: '修改数据',
        path: 'edit',
        authority: 'admin',
      },
    ],
  },
  {
    name: '基础数据',
    icon: 'table',
    path: 'report/basic',
  },
  {
    name: '综合数据',
    icon: 'profile',
    path: 'report/overall',
    authority: 'admin',
  },
  {
    name: '数据查询',
    icon: 'search',
    path: 'report/query',
    authority: 'admin',
  },
  {
    name: '系统管理',
    icon: 'user',
    path: 'system',
    authority: 'admin',
    children: [
      {
        name: '账户管理',
        path: 'account',
      },
      {
        name: '客户管理',
        path: 'customer',
      },
    ],
  },
  {
    name: '数据管理',
    icon: 'check-circle-o',
    path: 'purchase',
    authority: 'admin',
    children: [
      {
        name: '气量采购',
        path: 'new',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
