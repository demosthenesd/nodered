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

  // rooms/status
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Room No.", field: "id", width: 100 },
    { headerName: "Occupied", field: "occupied" },
    { headerName: "Dr. Name", field: "doctor_name" },
    { headerName: "Consult Start Time", field: "consult_start_time" },
  ]);

  // rooms/availability
  const [availableRooms, setAvailableRooms] = useState([]);
  const [occupiedRooms, setOccupiedRooms] = useState([]);

  // rooms/usage
  const [roomsUsedAsIntended, setRoomsUsedAsIntended] = useState([]);
  const [formsCompleted, setFormsCompleted] = useState([]);
  const [generalCheckups, setGeneralCheckups] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [xrays, setXrays] = useState([]);
  const [mris, setMris] = useState([]);
  const [injections, setInjections] = useState([]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  // Room status
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

  // Room availability
  useEffect(() => {
    fetch(`${URL}${AVAILABILITY_ENDPOINT}`)
      .then((res) => res.json())
      .then((data) => {
        setAvailableRooms(data.roomsAvailable);
        setOccupiedRooms(data.roomsOccupied);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Room usage
  useEffect(() => {
    fetch(`${URL}${USAGE_ENDPOINT}`)
      .then((res) => res.json())
      .then((data) => {
        setRoomsUsedAsIntended(data.roomsUsedAsIntended);
        setFormsCompleted(data.formsCompleted);
        setGeneralCheckups(data.generalCheckupTotal);
        setFollowUps(data.followUpTotal);
        setXrays(data.xrayTotal);
        setMris(data.mriTotal);
        setInjections(data.injectionTotal);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="App">
      <div className="ag-theme-balham" style={{ height: 360, width: 720 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          animateRows={true}
        />
      </div>

      <div>
        <h3>Live Room Data</h3>
        <div>✅ Available: {availableRooms}</div>
        <div>❌ Occupied: {occupiedRooms}</div>
      </div>

      <div>
        <h3>Historic Room Data</h3>
        <div>✅ Used as intended: {roomsUsedAsIntended}</div>
        <div>📝 Forms completed: {formsCompleted}</div>
        <div>
          📊 Usage efficiency:{" "}
          {Math.round((roomsUsedAsIntended / formsCompleted) * 100)}%
        </div>
      </div>

      <div>
        <h3>Most Common Uses</h3>
        <div>🩺 General checkups: {generalCheckups}</div>
        <div>😷 Follow-ups: {followUps}</div>
        <div>🩻 X-ray: {xrays}</div>
        <div>🧠 MRI's: {mris}</div>
        <div>💉 Injections: {injections}</div>
      </div>
    </div>
  );
}

export default App;
