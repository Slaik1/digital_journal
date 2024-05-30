import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
// eslint-disable-next-line no-duplicate-imports
import { Button, Menu } from 'antd';
import React, { useMemo, useState } from 'react';

import { MenuItem } from '../../ts/types/menu';

import { createMenuItems } from './helpers/createMenuItems';
import useMenu from './hooks/useMenu';

const items: MenuItem[] = [
  {
    key: '1',
    label: 'faculty1',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '2',
        label: 'group1',
        children: [
          { key: '3', label: 'lesson1' },
          { key: '4', label: 'lesson2' },
        ],
      },
    ],
  },
];

const Aside: React.FC = () => {
  const menuData = useMenu();
  const getMenuItems = useMemo(() => {
    if (!menuData) return [];

    return createMenuItems(menuData);
  }, [menuData]);

  return <Menu mode="inline" theme="light" items={getMenuItems} />;
};

export default Aside;
