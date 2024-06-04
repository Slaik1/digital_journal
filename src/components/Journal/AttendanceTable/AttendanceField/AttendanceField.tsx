import { Checkbox } from 'antd';
// eslint-disable-next-line import/named
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';

import api from '../../../../api/api';

import styles from './AttendanceField.module.scss';

interface AttendanceFieldProps {
  id: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
}

const AttendanceField: React.FC<AttendanceFieldProps> = ({
  id,
  value,
  onChange,
}) => {
  const handleChange = async (e: CheckboxChangeEvent) => {
    const newValue = e.target.checked;

    console.log(newValue);

    onChange(newValue);

    const data = await api.attendance.setValue(id, newValue);

    console.log('Заменено на', data.value);
  };

  return (
    <Checkbox
      className={styles.field}
      checked={value}
      onChange={handleChange}
    />
  );
};

export default AttendanceField;
