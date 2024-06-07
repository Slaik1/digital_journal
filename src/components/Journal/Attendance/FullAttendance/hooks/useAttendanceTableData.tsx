import { ColDef, ColGroupDef } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // для русских сокращений дней недели
import isoWeek from 'dayjs/plugin/isoWeek';

import AttendanceField from '../../AttendanceField/AttendanceField';
import { journalsStore } from '../../../../../stores/journalsStore/journalsStore';
import {
  Attendance,
  AttendanceJournal,
} from '../../../../../ts/types/attendance';
import { getStudentInitials } from '../../../helpers/getStudentFullName';

interface RowData {
  info: object;
  [key: string]: any;
}

dayjs.extend(isoWeek);

dayjs.locale('ru');

const useAttendanceTableData = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [columnDefs, setColumnDefs] = useState<Array<ColDef | ColGroupDef>>([]);
  const { attendanceJournal } = journalsStore;

  const createColData = (data: AttendanceJournal) => {
    const groupedByYear: {
      [year: string]: { [month: string]: { [week: string]: ColDef[] } };
    } = {};

    data.lessonsDates.forEach((date, index) => {
      const year = dayjs(date).format('YYYY');
      const month = dayjs(date).format('MM');
      const week = (Math.floor(index / 7) % 4) + 1;
      const day = dayjs(date).format('dd');
      const field = date.substring(0, 10);

      if (!groupedByYear[year]) {
        groupedByYear[year] = {};
      }
      if (!groupedByYear[year][month]) {
        groupedByYear[year][month] = {};
      }
      if (!groupedByYear[year][month][week]) {
        groupedByYear[year][month][week] = [
          {
            field: '4',
            headerName: '',
            columnGroupShow: 'closed',
          },
        ];
      }

      groupedByYear[year][month][week].push({
        field,
        headerName: `${day}`,
        columnGroupShow: 'open',
        headerTooltip: dayjs(date).format('DD.MM.YYYY'),
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
      });
    });

    const columns: Array<ColDef | ColGroupDef> = [
      {
        field: 'info',
        headerName: 'ФИО',
        pinned: 'left',
        cellRenderer: (params: any) => {
          return <p>{params.value.name}</p>;
        },
      },
      ...(Object.keys(groupedByYear).map((year) => ({
        headerName: year,
        children: [
          {
            field: '1',
            columnGroupShow: 'closed',
            headerName: '',
          },
          ...(Object.keys(groupedByYear[year]).map((month) => ({
            headerName: dayjs(`${year}-${month}-01`).format('MMMM'),
            children: [
              { field: '2', columnGroupShow: 'closed', headerName: '' },
              ...(Object.keys(groupedByYear[year][month]).map((week) => ({
                headerName: `Неделя ${week}`,
                children: groupedByYear[year][month][week],
                columnGroupShow: 'open',
              })) as Array<ColDef | ColGroupDef>),
            ],
            columnGroupShow: 'open',
          })) as Array<ColDef | ColGroupDef>),
        ],
      })) as Array<ColDef | ColGroupDef>),
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
