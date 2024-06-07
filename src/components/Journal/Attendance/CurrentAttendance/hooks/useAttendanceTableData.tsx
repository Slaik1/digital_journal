import { ColDef } from 'ag-grid-community';
import { useEffect, useState } from 'react';

import { journalsStore } from '../../../../../stores/journalsStore/journalsStore';
import {
  Attendance,
  AttendanceJournal,
} from '../../../../../ts/types/attendance';
import { getStudentInitials } from '../../../helpers/getStudentFullName';
import AttendanceField from '../../AttendanceField/AttendanceField';

interface RowData {
  info: object;
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
        const studentId = params.data.info.id;

        const onChange = (newValue: boolean) => {
          params.node.setDataValue(params.colDef.field, {
            value: newValue,
            _id: params.value._id,
          });
        };

        const onPost = (attendance: Attendance) => {
          const { _id, value } = attendance;

          params.node.setDataValue(params.colDef.field, {
            value: value,
            _id: _id,
          });
        };

        return (
          <AttendanceField
            value={value}
            date={date}
            id={params.value._id}
            studentId={studentId}
            onChange={onChange}
            onPost={onPost}
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

  const createRowData = (data: AttendanceJournal) => {
    const rows: RowData[] = data.studentsData.map((students) => {
      const studentData = students.student;

      const row: RowData = {
        info: {
          name: getStudentInitials(studentData),
          id: studentData._id,
        },
      };

      data.lessonsDates.forEach((date) => {
        const attendance = students.attendance[date];

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
