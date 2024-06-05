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
  id: string;
  value: number;
  date: string;
  studentId: string;
  onChange: (newValue: number | null) => void;
  onPost: (attendance: Mark) => void;
}

const MarkField: React.FC<MarkFieldProps> = ({
  id,
  value,
  date,
  studentId,
  onChange,
  onPost,
}) => {
  const { markJournal } = journalsStore;
  const journalId = markJournal?._id;

  const setApiData = useCallback(
    debounce(async (newValue: number) => {
      console.log('setApiData called with newValue:', newValue);

      let resData = null;

      console.log(id, 'id');

      if (id) {
        if (newValue === 0 || newValue === null) {
          console.log('Deleting mark');
          resData = await api.mark.delete(id);
          console.log('Mark deleted');

          return;
        }
        console.log('Setting new value');
        resData = await api.mark.setValue(id, newValue);
      } else {
        if (!journalId) return;

        console.log('Adding new mark');
        resData = await api.mark.addMark(
          journalId,
          studentId,
          '663d386a969366a8f9b74289',
          newValue,
          date
        );
        onPost(resData);
      }

      console.log('Заменено на', resData.value);
    }, 2000),
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
