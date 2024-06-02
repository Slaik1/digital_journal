import { AgGridReact } from 'ag-grid-react';
import { FC, useMemo } from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, CellEditingStoppedEvent } from 'ag-grid-community';

import useTableData from '../hooks/useTableData';

const MarkTable: FC = () => {
  const { columnDefs, markRowData } = useTableData();

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

  const localeText = {
    noRowsToShow: 'Пожалуйста выберите предмет',
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact
        rowData={markRowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        localeText={localeText}
        // onCellEditingStopped={onCellEditingStopped}
      />
    </div>
  );
};

export default MarkTable;
