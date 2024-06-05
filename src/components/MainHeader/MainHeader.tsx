import { Header } from 'antd/es/layout/layout';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './MainHeader.module.scss';

const MainHeader: FC = () => {
  return (
    <Header className={styles.header}>
      <h1 className={styles.university}>СКФ МТУСИ</h1>
      <Link to="/">
        <h1 className={styles.title}>Электронный журнал</h1>
      </Link>
      <Link to="/login">Войти</Link>
    </Header>
  );
};

export default MainHeader;
