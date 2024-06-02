import { useEffect, useState } from 'react';

import api from '../../../api/api';
import { journalsStore } from '../../../stores/journalsStore/journalsStore';

const useJournalData = () => {
  const [isMarksLoading, setIsMarksLoading] = useState(false);
  const [isAttendancesLoading, setIsAttendancesLoading] = useState(false);

  const fetchData = () => {
    const journalId = journalsStore.currentJournalId;

    if (!journalId) return;

    fetchMarkData();
    fetchAttendanceData();
  };

  const fetchMarkData = async () => {
    setIsMarksLoading(true);

    const data = await api.mark.getMarksJournal(journalsStore.currentJournalId);

    journalsStore.setMarksJournal(data);

    setIsMarksLoading(false);
  };

  const fetchAttendanceData = async () => {
    setIsAttendancesLoading(true);

    const data = await api.attendance.getAttendanceJournal(
      journalsStore.currentJournalId
    );

    journalsStore.setAttendanceJournal(data);

    setIsAttendancesLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [journalsStore.currentJournalId]);

  return { isMarksLoading, isAttendancesLoading };
};

export default useJournalData;
