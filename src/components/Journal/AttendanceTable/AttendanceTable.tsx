import { AgGridReact } from 'ag-grid-react';
import { FC, useMemo } from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, CellEditingStoppedEvent } from 'ag-grid-community';

import { localeText } from '../constants';
import useAttendanceTableData from './hooks/useAttendanceTableData';

import styles from './AttendanceTable.module.scss';

const AttendanceTable: FC = () => {
  const { rowData, columnDefs } = useAttendanceTableData();

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: false,
    };
  }, []);

  return (
    <AgGridReact
      rowData={rowData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      localeText={localeText}
      className={styles.header}
    />
  );
};

export default AttendanceTable;
