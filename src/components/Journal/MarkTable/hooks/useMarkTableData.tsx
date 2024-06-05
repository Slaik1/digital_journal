import { ColDef } from 'ag-grid-community';
import { useEffect, useState } from 'react';

import { journalsStore } from '../../../../stores/journalsStore/journalsStore';
import { Mark } from '../../../../ts/types/mark';
import { MarksJournal } from '../../../../ts/types/table';
import { getStudentInitials } from '../../helpers/getStudentFullName';
import MarkField from '../MarkField/MarkField';

interface RowData {
  info: object;
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
        const studentId = params.data.info.id;

        const onChange = (newValue: number | null) => {
          params.node.setDataValue(params.colDef.field, {
            value: newValue,
            _id: params.value._id,
          });
        };

        const onPost = (mark: Mark) => {
          const { _id, value } = mark;

          params.node.setDataValue(params.colDef.field, {
            value: value,
            id: _id,
          });
        };

        return (
          <MarkField
            date={date}
            onPost={onPost}
            studentId={studentId}
            value={value}
            onChange={onChange}
            id={params.value._id}
          />
        );
      },
    }));

    const columns: ColDef[] = [
      {
        field: 'info',
        headerName: 'ФИО',
        pinned: 'left',
        cellRenderer: (params: any) => {
          return <p>{params.value.name}</p>;
        },
      },
      ...dateColumns,
    ];

    setColumnDefs(columns);
  };

  const createRowData = (data: MarksJournal) => {
    const rows: RowData[] = data.studentsData.map((students) => {
      const studentData = students.student;

      const row: RowData = {
        info: {
          name: getStudentInitials(studentData),
          id: studentData._id,
        },
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
