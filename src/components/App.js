import React, { useState, useEffect } from 'react';
import { json, timeFormat, timeParse } from 'd3';
import HeatMap from './Heat-Map';
import LoadingSpinner from './Loading-Spinner';
import ErrorMessage from './Error-Message';
import Tooltip from './Tooltip';

const App = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [baseTemp, setBaseTemp] = useState(0);
  const [tooltip, setTooltip] = useState(null);

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

  function handleMouseEnter(event, value) {
    setTooltip({
      month: timeFormat('%B')(timeParse('%m')(value.month)),
      year: value.year,
      temp: (baseTemp + value.variance).toFixed(2),
      variance: value.variance > 0 ? '+' + value.variance.toFixed(2) : value.variance.toFixed(2),
      left: `${(event.pageX - 50)}px`,
      top: `${(event.pageY - 70)}px`
    });
  }

  function handleMouseLeave(event) {
    setTooltip(null);
  }

  return (
    <React.Fragment>
      <header>
        <h1>Monthly Global Temperature, 1753-2015</h1>
        {!loadingStatus && <h2>Base Temperature of {baseTemp}&deg;C</h2>}
      </header>
      <main>
        {loadingStatus ? <LoadingSpinner /> : loadSuccess ? <HeatMap baseTemp={baseTemp} tempData={tempData} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} /> : <ErrorMessage />}
        {tooltip && <Tooltip tooltip={tooltip} />}
      </main>
      <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;
