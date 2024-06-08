import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { journalsStore } from '../../stores/journalsStore/journalsStore';
import { settingsStore } from '../../stores/settingsStore/settingsStore';

import CurrentAttendance from './Attendance/CurrentAttendance/CurrentAttendance';
import FullAttendanceTable from './Attendance/FullAttendance/FullAttendanceTable';
import useJournalData from './hooks/useJournalData';
import MarkTable from './MarkTable/MarkTable';

import styles from './Journal.module.scss';

const Journal: FC = () => {
  const isLoading = useJournalData();

  const { journalType } = journalsStore;
  const { showFullAttendance } = settingsStore;

  const markStyles = classNames({
    [styles.table]: true,
    [styles.show]: journalType === 'mark',
  });

  const attendanceStyles = classNames({
    [styles.table]: true,
    [styles.show]: journalType === 'attendance',
  });

  return (
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
      {showFullAttendance ? (
        <FullAttendanceTable className={attendanceStyles} />
      ) : (
        <CurrentAttendance className={attendanceStyles} />
      )}
      <MarkTable className={markStyles} />
    </div>
  );
};

export default observer(Journal);
