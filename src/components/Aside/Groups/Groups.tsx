import type { MenuProps } from 'antd';
// eslint-disable-next-line no-duplicate-imports
import { Menu } from 'antd';
import React, { useMemo } from 'react';

import { journalsStore } from '../../../stores/journalsStore/journalsStore';

import { createMenuItems } from './helpers/createMenuItems';
import useMenu from './hooks/useMenu';

const Groups: React.FC = () => {
  const menuData = useMenu();
  const getMenuItems = useMemo(() => {
    if (!menuData) return [];

    return createMenuItems(menuData);
  }, [menuData]);

  const clickHandler: MenuProps['onClick'] = (e) => {
    journalsStore.setJournalId(e.key);
  };

  return (
    <Menu
      onClick={clickHandler}
      mode="inline"
      theme="light"
      items={getMenuItems}
    />
  );
};

export default Groups;
