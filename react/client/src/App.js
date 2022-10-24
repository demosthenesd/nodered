import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://ec2-44-212-25-96.compute-1.amazonaws.com:80/locations")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
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
          {data[1][1].username}
          {data[1][2].id}
          {data[1][3].id}
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
          {data[1][1].username}
          {data[1][2].id}
          {data[1][3].id}
        </div>
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
