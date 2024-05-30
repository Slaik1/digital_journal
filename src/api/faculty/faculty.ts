import axios from 'axios';

import { CONFIG } from '../../constants/config';

const ENDPOINT = CONFIG.baseUrl + 'faculty/';

export interface MenuData {
  _id: string;
  title: string;
  groups: {
    _id: string;
    title: string;
    journals: {
      _id: string;
      lesson: {
        _id: string;
        title: string;
      };
    }[];
  }[];
}

export const faculty = {
  getFaculties: async () => {
    const res = await axios.get(ENDPOINT + 'getFaculties');

    const data: MenuData[] = res.data;

    return data;
  },
};
