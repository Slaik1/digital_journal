import { Checkbox, Modal } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { settingsStore } from '../../../stores/settingsStore/settingsStore';

import styles from './Settings.module.scss';

interface SettingsProps {
  isOpen: boolean;
  changeState: () => void;
}

const Settings: FC<SettingsProps> = ({ isOpen, changeState }) => {
  const { setShowFullAttendance, showFullAttendance } = settingsStore;

  const handleChange = (e: CheckboxChangeEvent) => {
    setShowFullAttendance(e.target.checked);
  };

  return (
    <Modal open={isOpen} onCancel={changeState} title="Настройки" footer>
      <div className={styles.settingWrapper}>
        <p>Показывать посещаемость полностью</p>
        <Checkbox
          className={styles.checkBox}
          checked={showFullAttendance}
          onChange={handleChange}
        />
      </div>
    </Modal>
  );
};

export default observer(Settings);
