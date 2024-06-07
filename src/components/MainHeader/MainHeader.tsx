import { Header } from 'antd/es/layout/layout';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './MainHeader.module.scss';
import Settings from './Settings/Settings';

const MainHeader: FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  return (
    <Header className={styles.header}>
      <Link to="/" className={styles.linkWrapper}>
        <h1 className={styles.university}>СКФ МТУСИ</h1>
        <h1 className={styles.title}>Электронный журнал</h1>
      </Link>
      <p className={styles.settings} onClick={handleSettings}>
        Настройки
      </p>
      <Link to="/login">Войти</Link>
      <Settings isOpen={isSettingsOpen} changeState={handleSettings} />
    </Header>
  );
};

export default MainHeader;
