import logo from './logo.svg';
import './App.css';
import { RouteStore } from './Routes';
import { Preloader } from './Components';
import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    setLoading(false)
  }, [])

  return (
    <>
      <Preloader loading={loading}/>

      <div className="App flex flex-column overflow-x-hidden min-h-[100vh]">
        <RouteStore />
        {/*
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
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
        */}
      </div>
    </>
  );
}

export default App;
