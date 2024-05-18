import React, { useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import { marks } from '../../api/mark/mark';
import { TableData } from '../../ts/types/table';

interface RowData {
  ФИО: string;
  [key: string]: any;
}

const GridExample = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef<any>[]>([]);

  console.log(rowData);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);

  const getData = async () => {
    const data: TableData = await marks.getTableMarks();

    const dateColumns = data.lessonsDates.map((date) => ({
      field: new Date(date).toLocaleDateString(),
      headerName: new Date(date).toLocaleDateString(),
    }));

    const columns: ColDef<any>[] = [
      { field: 'ФИО', headerName: 'ФИО', pinned: 'left' },
      ...dateColumns,
    ];

    setColumnDefs(columns);

    const rows: RowData[] = data.studentsData.map((student) => {
      const row: RowData = {
        ФИО: `${student.student.lastName} ${student.student.firstName} ${student.student.patronymic}`,
      };

      data.lessonsDates.forEach((date) => {
        const markDate = new Date(date).toISOString();
        const mark = student.marks[markDate] || '';

        // console.log(`Оценка для ${student.student.lastName} ${student.student.firstName} ${student.student.patronymic} на ${date}:`, mark);
        row[new Date(date).toLocaleDateString()] = mark;
      });

      return row;
    });

    setRowData(rows);
  };

  useEffect(() => {
    getData();
  }, []);

  const rowData1 = [
    {
      '01.01.2024': 10,
      '02.01.2024': 3,
      '03.01.2024': 5,
      ФИО: 'Колмык Вячеслав Викторович',
    },
  ];

  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{ height: '50vh', width: '100%' }}
      >
        <AgGridReact
          rowData={rowData1}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default GridExample;
