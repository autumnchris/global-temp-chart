import React from 'react';

const Legend = ({ colorData }) => {
  return <g className="legend" transform="translate(125, 35)">{colorData.map((color, i) => {
    return <React.Fragment key={i}>
      <rect className="legend-color" x={i * 60} y="5" width="60" height="15" fill={`hsl(${color}, 75%, 55%)`} stroke="hsl(0, 0%, 20%)"></rect>
      <text className="legend-label" x={i * 60} y={30} fill="hsl(0, 0%, 100%)" style={{ fontSize: "0.7rem" }}>{i * 2}&deg;C</text>
    </React.Fragment>
  })}</g>;
}

export default Legend;