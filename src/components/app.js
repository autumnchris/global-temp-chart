import React from 'react';
import HeatMap from './Heat-Map';

const App = () => {
  return (
    <React.Fragment>
      <header>
        <h1>Monthly Global Temperature, 1753-2015</h1>
        <h2>Base Temperature of 8.66&deg;C</h2>
      </header>
      <main>
        <HeatMap />
      </main>
      <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;