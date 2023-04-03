import React from 'react';

const Header = ({ baseTemp, loadingStatus }) => {
  return (
    <header>
      <h1>Monthly Global Temperature, 1753-2015</h1>
    {!loadingStatus && <h2>Base Temperature of {baseTemp}&deg;C</h2>}
    </header>
  );
}

export default Header;