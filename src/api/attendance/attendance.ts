import axios from 'axios';

import { CONFIG } from '../../constants/config';
import { AttendanceJournal } from '../../ts/types/attendance';

const ENDPOINT = CONFIG.baseUrl + 'attendance/';

export const attendance = {
  getAttendanceJournal: async (journalId: string) => {
    const res = await axios.get(ENDPOINT + 'getAttendanceJournal', {
      params: {
        journalId,
      },
    });

    const data: AttendanceJournal = res.data;

    return data;
  },
  setValue: async (id: string, value: boolean) => {
    const res = await axios.put(ENDPOINT + 'setValue', { id, value });

    const data = res.data;

    return data;
  },
};
