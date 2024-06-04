import { ColDef } from 'ag-grid-community';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { journalsStore } from '../../../../stores/journalsStore/journalsStore';
import { AttendanceJournal } from '../../../../ts/types/attendance';
import { MarksJournal } from '../../../../ts/types/table';
import { getStudentFullName } from '../../helpers/getStudentFullName';
import AttendanceField from '../AttendanceField/AttendanceField';

interface RowData {
  ФИО: string;
  [key: string]: any;
}

const useAttendanceTableData = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const { attendanceJournal } = journalsStore;

  const createColData = (data: AttendanceJournal) => {
    const dateColumns = data.lessonsDates.map((date) => ({
      field: date.substring(0, 10),
      headerName: new Date(date).toLocaleDateString(),
      cellRenderer: (params: any) => {
        const value = params.value.value;
        const onChange = (newValue: boolean) => {
          params.node.setDataValue(params.colDef.field, {
            value: newValue,
            _id: params.value._id,
          });
        };

        return (
          <AttendanceField
            value={value}
            onChange={onChange}
            id={params.value._id}
          />
        );
      },
    }));

    const columns: ColDef[] = [
      { field: 'ФИО', headerName: 'ФИО', pinned: 'left' },
      ...dateColumns,
    ];

    setColumnDefs(columns);
  };

  const createRowData = (data: AttendanceJournal) => {
    const rows: RowData[] = data.studentsData.map((student) => {
      const row: RowData = {
        ФИО: getStudentFullName(student.student),
      };

      data.lessonsDates.forEach((date) => {
        const attendance = student.attendance[date];

        const attendanceValue = attendance ? attendance.value : false;
        const attendanceId = attendance ? attendance._id : null;

        row[date.substring(0, 10)] = {
          value: attendanceValue,
          _id: attendanceId,
        };
      });

      return row;
    });

    setRowData(rows);
  };

  useEffect(() => {
    if (!attendanceJournal) return;

    createColData(attendanceJournal);

    createRowData(attendanceJournal);
  }, [attendanceJournal]);

  return { rowData, columnDefs };
};

export default useAttendanceTableData;
