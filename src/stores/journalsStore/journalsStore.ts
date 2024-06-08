import { makeAutoObservable } from 'mobx';

import { AttendanceJournal } from '../../ts/types/attendance';
import { MarksJournal } from '../../ts/types/table';

export type TJournalType = 'mark' | 'attendance';

class JournalsStore {
  markJournal: N<MarksJournal> = null;
  attendanceJournal: N<AttendanceJournal> = null;
  currentJournalId = '';
  journalType: TJournalType = 'mark';

  constructor() {
    makeAutoObservable(this);
  }

  setMarksJournal = (data: MarksJournal) => {
    this.markJournal = data;
  };

  setAttendanceJournal = (data: AttendanceJournal) => {
    this.attendanceJournal = data;
  };

  setJournalId = (journalId: string) => {
    this.currentJournalId = journalId;
  };

  setJournalType = (type: TJournalType) => {
    this.journalType = type;
  };
}

export const journalsStore = new JournalsStore();
