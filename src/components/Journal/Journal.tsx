import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { journalsStore } from '../../stores/journalsStore/journalsStore';

import AttendanceTable from './AttendanceTable/AttendanceTable';
import useJournalData from './hooks/useJournalData';
import MarkTable from './MarkTable/MarkTable';

import styles from './Journal.module.scss';

const Journal: FC = () => {
  const isLoading = useJournalData();

  const { journalType } = journalsStore;

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
      <AttendanceTable className={attendanceStyles} />
      <MarkTable className={markStyles} />
    </div>
  );
};

export default observer(Journal);
