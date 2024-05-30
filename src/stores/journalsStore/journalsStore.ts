import { makeAutoObservable } from 'mobx';

import { MarksTable } from '../../ts/types/table';

class JournalsStore {
  journals: N<MarksTable> = null;
  currentJournalId = '';

  constructor() {
    makeAutoObservable(this);
  }

  setMarksTable = (data: MarksTable) => {
    this.journals = data;
  };
}

export const journalsStore = new JournalsStore();
