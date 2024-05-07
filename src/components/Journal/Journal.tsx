// eslint-disable-next-line import/no-unresolved
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid
import { ChangeEvent, useMemo, useState } from 'react';
import { Input, Button } from 'antd';

const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'make', pivot: true, initialHide:false },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);

  const [inputValue, setInputValue] = useState('');

  const addHandler = () => {
    setColumnDefs((prev)=> [...prev, { field: inputValue },])
  }

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);
  };

  return (
    <div>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: '50dvh' }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          defaultColDef={defaultColDef}
        />
      </div>
      <Input value={inputValue} onChange={handleInputChange}/>
      <Button onClick={addHandler}>Добавить</Button>
    </div>
  );
};

export default GridExample;
