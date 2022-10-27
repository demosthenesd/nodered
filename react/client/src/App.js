import "./App.css";
import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

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
    { headerName: "Room ID", field: "id", width: 125 },
    { headerName: "Occupied", field: "occupied" },
    { headerName: "Doctor Name", field: "doctor_name" },
    { headerName: "Consult Start time", field: "consult_start_time" },
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

  const chartData = [
    {
      title: "General Checkup 🩺",
      value: generalCheckups,
    },
    {
      title: "Follow-up 😷",
      value: followUps,
    },
    {
      title: "X-ray 🩻",
      value: xrays,
    },
    {
      title: "MRI 🧠",
      value: mris,
    },
    {
      title: "Injection 💉",
      value: injections,
    },
  ];

  const donutValue = Math.round((roomsUsedAsIntended / formsCompleted) * 100);

  const donutData = {
    labels: ["Usage","To Improve"],
    datasets: [
      {
        label: "My First Dataset",
        data: [ donutValue,100 - donutValue],
        backgroundColor: [ "#99C2EC","rgb(170, 183, 184)"],
        hoverOffset: 15,
        cutout :160,
       
      },
    ],
  };

  const usageData = {
    labels: chartData.map((data) => data.title),
    datasets: [
      {
        label: "Count",
        data: chartData.map((data) => data?.value),
        backgroundColor: ["#E1F2F2", "#FCEDDD", "#DDECFA", "#E9E1FD"],
        minBarLength: 9,
        barPercentage: 0.75,
        borderColor: "black",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="App">
      <SideBar />
      <div className="mainContainer">
        <div className="ag-theme-balham">
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
       
        <h1 className="donutTitle">{donutValue}%</h1>

          <div className="donutContainer">
            <Doughnut
              data={donutData}
              options={{
                maintainAspectRatio:false,
                
                plugins: {
                  title: {
                    display: true,
                    text: "📊 Usage efficiency",
                    
                  },
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="barChart">
          <Bar
            data={usageData}
            options={{
          
              plugins: {
                title: {
                  display: true,
                  text: "Consultation Types",
                },
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>

        <div className="widgets">
          <div className="inside-widget">
            <h3>Historic Room Data</h3>
            <div>✅ Used as intended: {roomsUsedAsIntended}</div>
            <div>📝 Forms completed: {formsCompleted}</div>
          </div>
          <div className="inside-widget">
            <h3>Live Room Data</h3>
            <div>✅ Available: {availableRooms}</div>
            <div>❌ Occupied: {occupiedRooms}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
