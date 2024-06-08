import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { FC, useMemo } from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { LOCALE_TEXT } from '../../constants';

import useAttendanceTableData from './hooks/useAttendanceTableData';

interface AttendanceTableProps {
  className?: string;
}

const FullAttendanceTable: FC<AttendanceTableProps> = ({ className = '' }) => {
  const { rowData, columnDefs } = useAttendanceTableData();

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
    };
  }, []);

  const gridStyles = classNames({
    [className]: !!className,
  });

  console.log(columnDefs, 'columnDefs');

  return (
    <AgGridReact
      rowData={rowData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      localeText={LOCALE_TEXT}
      className={gridStyles}
    />
  );
};

export default FullAttendanceTable;
