import { ColDef } from 'ag-grid-community';
import { useEffect, useState } from 'react';

import { journalsStore } from '../../../../stores/journalsStore/journalsStore';
import { MarksJournal } from '../../../../ts/types/table';
import { getStudentFullName } from '../../helpers/getStudentFullName';

interface RowData {
  ФИО: string;
  [key: string]: any;
}

const useMarkTableData = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const { markJournal } = journalsStore;

  const createColData = (data: MarksJournal) => {
    const dateColumns = data.lessonsDates.map((date) => ({
      field: date.substring(0, 10),
      headerName: new Date(date).toLocaleDateString(),
      valueGetter: (params: any) => params.data[params.colDef.field!]?.value,
      valueSetter: (params: any) => {
        params.data[params.colDef.field!].value = params.newValue;

        return true;
      },
    }));

    const columns: ColDef[] = [
      { field: 'ФИО', headerName: 'ФИО', pinned: 'left' },
      ...dateColumns,
    ];

    setColumnDefs(columns);
  };

  const createRowData = (data: MarksJournal) => {
    const rows: RowData[] = data.studentsData.map((students) => {
      const row: RowData = {
        ФИО: getStudentFullName(students.student),
      };

      data.lessonsDates.forEach((date) => {
        const mark = students.marks[date] || null;

        row[date.substring(0, 10)] = { value: mark, _id: date };
      });

      return row;
    });

    setRowData(rows);
  };

  useEffect(() => {
    if (!markJournal) return;

    createColData(markJournal);
    createRowData(markJournal);
  }, [markJournal]);

  return { rowData, columnDefs };
};

export default useMarkTableData;
