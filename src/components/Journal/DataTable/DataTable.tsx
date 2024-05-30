import { FC, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, CellEditingStoppedEvent } from 'ag-grid-community';
import { observer } from 'mobx-react-lite';

import useTableData from './hooks/useTableData';

interface TableProps {
  isLoading: boolean;
}

const DataTable: FC<TableProps> = ({ isLoading }) => {
  const { columnDefs, rowData } = useTableData();

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);

  // const onCellEditingStopped = (event: CellEditingStoppedEvent) => {
  //   const { colDef, data } = event;

  //   console.log(
  //     `Редактирование завершено в колонке: ${colDef.headerName}, новое значение: ${data[colDef.field!]}`
  //   );
  // };

  return (
    <div className="ag-theme-alpine" style={{ height: '50vh', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        // onCellEditingStopped={onCellEditingStopped}
      />
    </div>
  );
};

export default observer(DataTable);
