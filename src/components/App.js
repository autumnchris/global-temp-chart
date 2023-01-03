import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import HeatMap from './HeatMap';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const App = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [tempData, setTempData] = useState([]);
  const [baseTemp, setBaseTemp] = useState(0);

  useEffect(() => {
    json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(dataset => {
      setLoadingStatus(false);
      setTempData(dataset.monthlyVariance);
      setBaseTemp(dataset.baseTemperature);
    }).catch(() => {
      setLoadingStatus(false);
      setTempData([]);
      setBaseTemp(0);
    });
  }, []);

  return (
    <React.Fragment>
      <header>
        <h1>Monthly Global Temperature, 1753-2015</h1>
        {!loadingStatus && <h2>Base Temperature of {baseTemp}&deg;C</h2>}
      </header>
      <main>
        {loadingStatus && tempData.length === 0 ? <LoadingSpinner /> : tempData.length !== 0 ? <HeatMap baseTemp={baseTemp} tempData={tempData} /> : <ErrorMessage />}
      </main>
      <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;
