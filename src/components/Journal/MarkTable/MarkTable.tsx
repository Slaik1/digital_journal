import { AgGridReact } from 'ag-grid-react';
import { FC, useMemo } from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, CellEditingStoppedEvent } from 'ag-grid-community';
import useMarkTableData from './hooks/useMarkTableData';

const MarkTable: FC = () => {
  const { columnDefs, rowData } = useMarkTableData();

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      editable: false,
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
    <AgGridReact
      rowData={rowData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      localeText={localeText}
      // onCellEditingStopped={onCellEditingStopped}
    />
  );
};

export default MarkTable;
