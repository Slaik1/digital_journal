import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { journalsStore } from '../../stores/journalsStore/journalsStore';

import AttendanceTable from './AttendanceTable/AttendanceTable';
import useJournalData from './hooks/useJournalData';
import MarkTable from './MarkTable/MarkTable';

const Journal: FC = () => {
  const isLoading = useJournalData();

  return (
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
      {journalsStore.journalType === 'mark' ? (
        <MarkTable />
      ) : (
        <AttendanceTable />
      )}
    </div>
  );
};

export default observer(Journal);
