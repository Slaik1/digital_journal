import axios from 'axios';

import { CONFIG } from '../../constants/config';

const ENDPOINT = CONFIG.baseUrl + 'mark/';

export const mark = {
  getMarksTable: async (journalId: string) => {
    const res = await axios.get(ENDPOINT + 'getMarksTable', {
      params: {
        journalId,
      },
    });

    return res.data;
  },
};
