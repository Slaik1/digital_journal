import type { MenuProps } from 'antd';
// eslint-disable-next-line no-duplicate-imports
import { Menu } from 'antd';
import { FC } from 'react';

import {
  TJournalType,
  journalsStore,
} from '../../../stores/journalsStore/journalsStore';
import { MenuItem } from '../../../ts/types/menu';

const JournalType: FC = () => {
  const items: MenuItem[] = [
    { key: 'mark', label: 'Успеваемость' },
    { key: 'attendance', label: 'Посещаемость' },
  ];

  const clickHandler: MenuProps['onClick'] = (e) => {
    journalsStore.setJournalType(e.key as TJournalType);
  };

  return (
    <Menu
      mode="inline"
      theme="light"
      items={items}
      defaultSelectedKeys={['mark']}
      onClick={clickHandler}
    />
  );
};

export default JournalType;
