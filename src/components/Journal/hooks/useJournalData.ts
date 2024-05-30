import { useEffect, useState } from 'react';

import api from '../../../api/api';
import { journalsStore } from '../../../stores/journalsStore/journalsStore';
import { MarksTable } from '../../../ts/types/table';

const useJournalData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    const data: MarksTable = await api.mark.getMarksTable(
      '663d37a8969366a8f9b74282'
    );

    journalsStore.setMarksTable(data);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading;
};

export default useJournalData;
