import React from 'react';
import './App.css';

const fetchData = async () => {
    const data = await fetch('api/WeatherForecast')
    const normData = await data.json();
    console.log(normData);
}

function App() {
  return (
    <div className="App">
          it is workdsfsf
          <button onClick={fetchData}>click</button>
    </div>
  );
}

export default App;
