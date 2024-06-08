import { Checkbox } from 'antd';
// eslint-disable-next-line import/named
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useCallback } from 'react';

import api from '../../../../api/api';
import { debounce } from '../../../../helpers/debounce';
import { journalsStore } from '../../../../stores/journalsStore/journalsStore';
import { Attendance } from '../../../../ts/types/attendance';

import styles from './AttendanceField.module.scss';

interface AttendanceFieldProps {
  id: string;
  value: boolean;
  date: string;
  studentId: string;
  onChange: (newValue: boolean) => void;
  onPost: (attendance: Attendance) => void;
}

const AttendanceField: React.FC<AttendanceFieldProps> = ({
  id,
  value,
  date,
  studentId,
  onChange,
  onPost,
}) => {
  const { attendanceJournal } = journalsStore;

  const journalId = attendanceJournal?._id;

  const setApiData = useCallback(
    debounce(async (newValue: boolean) => {
      let resData = null;

      if (!id) {
        if (!journalId) return;

        resData = await api.attendance.addAttendance(
          journalId,
          studentId,
          '663d386a969366a8f9b74289',
          newValue,
          date
        );

        onPost(resData);
      } else {
        resData = await api.attendance.setValue(id, newValue);
      }

      console.log('Заменено на', resData.value);
    }, 1000),
    []
  );

  const handleChange = async (e: CheckboxChangeEvent) => {
    const newValue = e.target.checked;

    onChange(newValue);
    setApiData(newValue);
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
