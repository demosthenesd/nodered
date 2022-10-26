import "./App.css";
import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

//components
import SideBar from "./components/SideBar";


function App() {
  const URL = "http://44.206.81.55/";
  const STATUS_ENDPOINT = "rooms/status";
  const AVAILABILITY_ENDPOINT = "rooms/availability";
  const USAGE_ENDPOINT = "rooms/usage";

  // rooms/status
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Room ID", field: "id" },
    { headerName: "Occupied", field: "occupied" },
    { headerName: "Doctor Name", field: "doctor_name" },
    { headerName: "Consult Start time", field: "consult_start_time" }
   
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
      <SideBar />
      <div className="mainContainer">
        <div className="ag-theme-balham" style={{ height: 400, width: 850 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={20}
            animateRows={true}
          />
        </div>

        <div className="pieChart">
         <h1>PIE CHART GOES HERE</h1>
        </div>
        <div className="barChart">
         <h1>Bar CHART GOES HERE</h1>
        </div>


        <div className="widgets">
          <h3>Historic Room Data</h3>
          <div>✅ Used as intended: {roomsUsedAsIntended}</div>
          <div>📝 Forms completed: {formsCompleted}</div>
          <div>
            📊 Usage efficiency:{" "}
            {Math.round((roomsUsedAsIntended / formsCompleted) * 100)}%
          </div>

          <div>
            <h3>Most Common Uses</h3>
            <div>🩺 General checkups: {generalCheckups}</div>
            <div>😷 Follow-ups: {followUps}</div>
            <div>🩻 X-ray: {xrays}</div>
            <div>🧠 MRI's: {mris}</div>
            <div>💉 Injections: {injections}</div>
          </div>
          <h3>Live Room Data</h3>
          <div>✅ Available: {availableRooms}</div>
          <div>❌ Occupied: {occupiedRooms}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
