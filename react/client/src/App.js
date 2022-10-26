import "./App.css";
import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

function App() {
  const URL = "http://44.206.81.55/";
  const ENDPOINT = "rooms/status";

  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Room No.", field: "id", width: 100 },
    { headerName: "Occupied", field: "occupied" },
    { headerName: "Dr. Name", field: "doctor_name" },
    { headerName: "Consult Start Time", field: "consult_start_time" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  // useEffect(() => {
  //   fetch(`${URL}${ENDPOINT}`)
  //     .then((res) => res.json())
  //     .then((rowData) => {
  //       setRowData(rowData.patients);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);

  return (
    <div className="App">
      <div className="ag-theme-balham" style={{ height: 400, width: 705 }}>
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
