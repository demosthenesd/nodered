import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const URL = "http://54.163.22.133/";
  const ENDPOINT = "locations";

  useEffect(() => {
    fetch(`${URL}${ENDPOINT}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.locations);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {data.map((entry) => (
            <li key={entry.id}>
              {entry.id} - {entry.username} - {entry.device_timestamp}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;