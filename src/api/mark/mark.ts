import axios from 'axios';

import { CONFIG } from '../../constants/config';
import { MarksJournal } from '../../ts/types/table';

const ENDPOINT = CONFIG.baseUrl + 'mark/';

export const mark = {
  getMarksJournal: async (journalId: string) => {
    const res = await axios.get(ENDPOINT + 'getMarksJournal', {
      params: {
        journalId,
      },
    });

    const data: MarksJournal = res.data;

    return data;
  },
  setMark: async (
    journalId: string,
    studentId: string,
    teacherId: string,
    value: number | null,
    work: string
  ) => {
    const res = await axios.post(ENDPOINT + 'setMark', {
      journalId,
      studentId,
      teacherId,
      value,
      work,
    });

    const data = res.data;

    return data;
  },
};
