import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { journalsStore } from '../../stores/journalsStore/journalsStore';

import AttendanceTable from './AttendanceTable/AttendanceTable';
import useJournalData from './hooks/useJournalData';
import MarkTable from './MarkTable/MarkTable';

const Journal: FC = () => {
  const isLoading = useJournalData();

  return journalsStore.journalType === 'mark' ? (
    <MarkTable />
  ) : (
    <AttendanceTable />
  );
};

export default observer(Journal);
