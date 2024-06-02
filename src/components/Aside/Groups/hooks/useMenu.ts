import { useEffect, useState } from 'react';

import api from '../../../../api/api';
import { MenuData } from '../../../../api/faculty/faculty';

const useMenu = () => {
  const [menuData, setMenuData] = useState<MenuData[]>();

  const fetchData = async () => {
    const data = await api.faculty.getFaculties();

    setMenuData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return menuData;
};

export default useMenu;
