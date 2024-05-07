import { Layout } from 'antd';
import { FC, useState } from 'react';

import Aside from '../Aside/Aside';

import styles from './LayoutWrapper.module.scss';
import Journal from '../Journal/Journal';

const { Header, Sider, Content } = Layout;

const LayoutWrapper: FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.layout}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme='light'
      >
        <Aside />
      </Sider>
      <Layout>
        {/* <Header className={styles.header}>header</Header> */}
        <Content><Journal/></Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
