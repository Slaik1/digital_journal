import { ColDef } from 'ag-grid-community';
// eslint-disable-next-line import/named
import { valueType } from 'antd/es/statistic/utils';
import { useEffect, useState } from 'react';

import { journalsStore } from '../../../../stores/journalsStore/journalsStore';
import { MarksJournal } from '../../../../ts/types/table';
import { getStudentFullName } from '../../helpers/getStudentFullName';
import MarkField from '../MarkField/MarkField';

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
      cellRenderer: (params: any) => {
        const value = params.value.value;
        const onChange = (newValue: number) => {
          params.node.setDataValue(params.colDef.field, {
            value: newValue,
            _id: params.value._id,
          });
        };

        return (
          <MarkField value={value} onChange={onChange} id={params.value._id} />
        );
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
        const mark = students.marks[date];

        const markValue = mark ? mark.value : null;
        const markId = mark ? mark._id : null;

        row[date.substring(0, 10)] = {
          value: markValue,
          _id: markId,
        };
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
