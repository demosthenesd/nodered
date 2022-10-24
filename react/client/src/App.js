import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';

function App() {

  const [data,setData] = useState([]);

  useEffect(() =>
  {
    fetch('http://ec2-3-83-108-89.compute-1.amazonaws.com:9000/locations')
    .then(res => res.json())
    .then(data => setData(data))
  },[]);



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        {
          data && data.map(data => (
            <div key = {data.id}>{data.username}</div>))
        }


          Edit <code>src/App.js</code> and save to reload.
        </p>
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
