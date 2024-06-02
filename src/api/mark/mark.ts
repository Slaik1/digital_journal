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
};
