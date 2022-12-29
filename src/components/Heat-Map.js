import React from 'react';
import { scaleBand, timeParse } from 'd3';
import Legend from './Legend';
import Axis from './Axis'
import Cell from './Cell';

const HeatMap = ({ baseTemp, tempData, handleMouseEnter, handleMouseLeave }) => {
  const margin = {
    top: 50,
    right: 40,
    bottom: 90,
    left: 100
  };
  const w = 800;
  const h = w * 0.5;
  const xScale = scaleBand()
    .domain(tempData.map((d) => d.year))
    .range([margin.left, w - margin.right]);
  const yScale = scaleBand()
    .domain(tempData.map((d) => timeParse('%m')(d.month)))
    .range([margin.bottom, h - margin.top]);
  const colorData = [
    210,
    175,
    140,
    105,
    70,
    35,
    0
  ];

  return (
    <div className="chart-container">
      <svg className="heat-map" viewBox={`0 0 ${w} ${h}`}>
        <Legend colorData={colorData} />
        <Axis className="x-axis" transform={`translate(0, ${h - margin.top})`} scale={xScale} />
        <Axis className="y-axis" transform={`translate(${margin.left}, 0)`} scale={yScale} />
        {tempData.map((cell, i) => <Cell key={i} cell={cell} x={xScale(cell.year)} y={yScale(timeParse('%m')(cell.month))} width={xScale.bandwidth()} height={yScale.bandwidth()} colorData={colorData} baseTemp={baseTemp} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />)}
      </svg>
    </div>
  );
}

export default HeatMap;
