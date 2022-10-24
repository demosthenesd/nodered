import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';

function App() {

  const [data,setData] = useState([]);

  useEffect(() =>
  {
    fetch('http://localhost:80/locations')
    .then(res => res.json())
    .then(data => setData(data))
    .catch((e) => {console.log(e)})
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
