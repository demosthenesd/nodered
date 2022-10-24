import logo from "./logo.svg";
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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <ul>
          {data.map((entry) => (
            <li key={entry.id}>
              {entry.id} - {entry.username} - {entry.device_timestamp}
            </li>
          ))}
        </ul>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
