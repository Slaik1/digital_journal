import { FC } from 'react';

import DataTable from './DataTable/DataTable';
import useJournalData from './hooks/useJournalData';

const Journal: FC = () => {
  const isLoading = useJournalData();

  return <DataTable isLoading={true} />;
};

export default Journal;
