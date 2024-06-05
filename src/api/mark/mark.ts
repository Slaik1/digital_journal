import axios from 'axios';

import { CONFIG } from '../../constants/config';
import { Mark } from '../../ts/types/mark';
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
  setValue: async (id: string, value: number | null) => {
    const res = await axios.put(ENDPOINT + 'setValue', { id, value });

    const data = res.data;

    return data;
  },
  delete: async (id: string) => {
    const res = await axios.delete(ENDPOINT + 'delete', { data: { id } });

    const data = res.data;

    return data;
  },
  addMark: async (
    journalId: string,
    studentId: string,
    teacherId: string,
    value: number | null,
    date: string
  ) => {
    const res = await axios.post(ENDPOINT + 'addMark', {
      journalId,
      studentId,
      teacherId,
      value,
      date,
    });

    const data: Mark = res.data;

    return data;
  },
};
