import "./App.css";
import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

function App() {
  const URL = "http://54.234.196.205/";
  const ENDPOINT = "locations";

  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "ID", field: "id", width: 75 },
    { headerName: "Username", field: "username", width: 100 },
    { headerName: "Timestamp", field: "device_timestamp" },
    { headerName: "Coordinates", field: "device_coordinates" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  useEffect(() => {
    fetch(`${URL}${ENDPOINT}`)
      .then((result) => result.json())
      .then((rowData) => {
        setRowData(rowData.locations);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="App">
      <div className="ag-theme-balham" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          animateRows={true}
        />
      </div>
    </div>
  );
}

export default App;
