import { ColDef } from 'ag-grid-community';
import { useEffect, useState } from 'react';

import { journalsStore } from '../../../stores/journalsStore/journalsStore';
import { AttendanceJournal } from '../../../ts/types/attendance';
import { MarksJournal } from '../../../ts/types/table';
import { getStudentFullName } from '../helpers/getStudentFullName';

interface RowData {
  ФИО: string;
  [key: string]: any;
}

const useTableData = () => {
  const [markRowData, setMarkRowData] = useState<RowData[]>([]);
  const [attendanceRowData, setAttendanceRowData] = useState<RowData[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const { markJournal, attendanceJournal } = journalsStore;

  const createColData = (data: MarksJournal) => {
    const dateColumns = data.lessonsDates.map((date) => ({
      field: new Date(date).getTime().toString(),
      headerName: new Date(date).toLocaleDateString(),
    }));

    const columns: ColDef[] = [
      { field: 'ФИО', headerName: 'ФИО', pinned: 'left' },
      ...dateColumns,
    ];

    setColumnDefs(columns);
  };

  const createMarkRowData = (data: MarksJournal) => {
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

    setMarkRowData(rows);
  };

  const createAttendanceRowData = (data: AttendanceJournal) => {
    const rows: RowData[] = data.studentsData.map((student) => {
      const row: RowData = {
        ФИО: getStudentFullName(student.student),
      };

      data.lessonsDates.forEach((date) => {
        const attendanceDate = new Date(date).toISOString();
        const attendance = student.attendance[attendanceDate] || false;

        row[new Date(date).getTime().toString()] = attendance;
      });

      return row;
    });

    setAttendanceRowData(rows);
  };

  useEffect(() => {
    if (!markJournal || !attendanceJournal) return;

    createColData(markJournal);

    createMarkRowData(markJournal);

    createAttendanceRowData(attendanceJournal);
  }, [markJournal, attendanceJournal]);

  return { markRowData, attendanceRowData, columnDefs };
};

export default useTableData;
