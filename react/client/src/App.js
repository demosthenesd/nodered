import "./App.css";
import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

function App() {

  const URL = "http://44.206.81.55/";
  const ENDPOINT = "patients";

  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Sean", field: "contact_id", width: 75 },
    { headerName: "Patient Name", field: "name"},
    { headerName: "Email Address", field: "email" },
    { headerName: "Street Address", field: "address" },
    { headerName: "Suburb", field: "suburb" },
    { headerName: "Country", field: "country" },
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
      .then((res) => res.json())
      .then((rowData) => {
        setRowData(rowData.patients);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);




  return (
    <div className="App">
      <div className="ag-theme-balham" style={{ height: 400, width: 1080 }}>
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
