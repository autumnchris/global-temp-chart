import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import Header from './components/Header';
import Footer from './components/Footer';
import HeatMap from './components/HeatMap';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

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
      <Header baseTemp={baseTemp} loadingStatus={loadingStatus} />
      <main>
        {loadingStatus && tempData.length === 0 ? <LoadingSpinner /> : tempData.length !== 0 ? <HeatMap baseTemp={baseTemp} tempData={tempData} /> : <ErrorMessage />}
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
