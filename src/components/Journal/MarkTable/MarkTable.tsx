import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { FC, useMemo } from 'react';

import { LOCALE_TEXT } from '../constants';

import useMarkTableData from './hooks/useMarkTableData';

interface MarkTableProps {
  className?: string;
}

const MarkTable: FC<MarkTableProps> = ({ className = '' }) => {
  const { columnDefs, rowData } = useMarkTableData();

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
    };
  }, []);

  const gridStyles = classNames({
    [className]: !!className,
  });

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

export default MarkTable;
