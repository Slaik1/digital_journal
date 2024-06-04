import { Checkbox, Flex, InputNumber } from 'antd';

// eslint-disable-next-line no-duplicate-imports
import type { InputNumberProps } from 'antd';

// eslint-disable-next-line import/named
import { valueType } from 'antd/es/statistic/utils';
import React from 'react';

import api from '../../../../api/api';

import styles from './MarkField.module.scss';

interface MarkFieldProps {
  id: string;
  value: number;
  onChange: (newValue: number) => void;
}

const MarkField: React.FC<MarkFieldProps> = ({ id, value, onChange }) => {
  const handleChange: InputNumberProps['onChange'] = async (value) => {
    if (!value) return;

    const newValue = Number(value);

    onChange(newValue);

    const data = await api.mark.setValue(id, newValue);

    console.log('Заменено на', data.value);
  };

  return (
    <InputNumber
      variant="borderless"
      className={styles.field}
      value={value}
      onChange={handleChange}
      min={1}
      max={10}
      changeOnWheel
    />
  );
};

export default MarkField;
