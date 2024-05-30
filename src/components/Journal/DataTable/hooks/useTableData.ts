import { ColDef } from 'ag-grid-community';
import { useEffect, useState } from 'react';

import { journalsStore } from '../../../../stores/journalsStore/journalsStore';
import { getStudentFullName } from '../helpers/getStudentFullName';

interface RowData {
  ФИО: string;
  [key: string]: any;
}

const useTableData = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const { journals } = journalsStore;

  const createData = () => {
    const data = journals;

    if (!data) return;

    const dateColumns = data.lessonsDates.map((date) => ({
      field: new Date(date).getTime().toString(),
      headerName: new Date(date).toLocaleDateString(),
    }));

    const columns: ColDef[] = [
      { field: 'ФИО', headerName: 'ФИО', pinned: 'left' },
      ...dateColumns,
    ];

    setColumnDefs(columns);

    const rows: RowData[] = data.studentsData.map((students) => {
      const row: RowData = {
        ФИО: getStudentFullName(students.student),
      };

      data.lessonsDates.forEach((date) => {
        const markDate = new Date(date).toISOString();
        const mark = students.marks[markDate] || null;

        row[new Date(date).getTime().toString()] = mark;
      });

      return row;
    });

    setRowData(rows);
  };

  useEffect(() => {
    createData();
  }, [journals]);

  return { rowData, columnDefs };
};

export default useTableData;
