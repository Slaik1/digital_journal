import { Layout } from 'antd';
import { FC, useState } from 'react';

import Aside from '../Aside/Aside';
import Journal from '../Journal/Journal';
import MainHeader from '../MainHeader/MainHeader';

import styles from './LayoutWrapper.module.scss';

const { Sider, Content } = Layout;

const LayoutWrapper: FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.layout}>
      <MainHeader />
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
        >
          <Aside />
        </Sider>
        <Content>
          <Journal />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
