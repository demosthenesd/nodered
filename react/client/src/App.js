import "./App.css";
import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

function App() {
  const URL = "http://44.206.81.55/";
  const STATUS_ENDPOINT = "rooms/status";
  const AVAILABILITY_ENDPOINT = "rooms/availability";
  const USAGE_ENDPOINT = "rooms/usage";

  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Room No.", field: "id", width: 100 },
    { headerName: "Occupied", field: "occupied" },
    { headerName: "Dr. Name", field: "doctor_name" },
    { headerName: "Consult Start Time", field: "consult_start_time" },
  ]);

  const [availableRooms, setAvailableRooms] = useState([]);
  const [occupiedRooms, setOccupiedRooms] = useState([]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  // Room Status
  useEffect(() => {
    fetch(`${URL}${STATUS_ENDPOINT}`)
      .then((res) => res.json())
      .then((rowData) => {
        setRowData(rowData.status);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Room Availability
  useEffect(() => {
    fetch(`${URL}${AVAILABILITY_ENDPOINT}`)
      .then((res) => res.json())
      .then((rowData) => {
        setAvailableRooms(rowData.roomsAvailable);
        setOccupiedRooms(rowData.roomsOccupied);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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

      <div>Rooms Available: {availableRooms}</div>
      <div>Rooms Occupied: {occupiedRooms}</div>
    </div>
  );
}

export default App;
