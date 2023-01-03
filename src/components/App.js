import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import HeatMap from './Heat-Map';
import LoadingSpinner from './Loading-Spinner';
import ErrorMessage from './Error-Message';

const App = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [baseTemp, setBaseTemp] = useState(0);

  useEffect(() => {
    json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(dataset => {
      setLoadingStatus(false);
      setLoadSuccess(true);
      setTempData(dataset.monthlyVariance);
      setBaseTemp(dataset.baseTemperature);
    }).catch(() => {
      setLoadingStatus(false);
      setLoadSuccess(false);
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
        {loadingStatus ? <LoadingSpinner /> : loadSuccess ? <HeatMap baseTemp={baseTemp} tempData={tempData} /> : <ErrorMessage />}
      </main>
      <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;
