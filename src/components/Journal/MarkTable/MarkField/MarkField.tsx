import { InputNumber } from 'antd';
// eslint-disable-next-line no-duplicate-imports
import type { InputNumberProps } from 'antd';
import React, { useCallback } from 'react';

import api from '../../../../api/api';
import { debounce } from '../../../../helpers/debounce';
import { journalsStore } from '../../../../stores/journalsStore/journalsStore';
import { Mark } from '../../../../ts/types/mark';

import styles from './MarkField.module.scss';

interface MarkFieldProps {
  value: number;
  studentId: string;
  work: string;
  onChange: (newValue: number | null) => void;
  onPost: (attendance: Mark) => void;
}

const MarkField: React.FC<MarkFieldProps> = ({
  value,
  work,
  studentId,
  onChange,
  onPost,
}) => {
  const { markJournal } = journalsStore;
  const journalId = markJournal?._id;

  const setApiData = useCallback(
    debounce(async (newValue: number) => {
      if (!journalId) return;

      const resData = await api.mark.setMark(
        journalId,
        studentId,
        '663d386a969366a8f9b74289',
        newValue,
        work
      );

      if (!resData.resData) return;

      onPost(resData.resData);
    }, 1000),
    []
  );

  const handleChange: InputNumberProps['onChange'] = async (value) => {
    const newValue = Number(value);

    if (newValue === 0) {
      onChange(null);
    } else {
      onChange(newValue);
    }
    setApiData(newValue);
  };

  return (
    <InputNumber
      variant="borderless"
      className={styles.field}
      value={value}
      onChange={handleChange}
      min={0}
      max={10}
      changeOnWheel
    />
  );
};

export default MarkField;
