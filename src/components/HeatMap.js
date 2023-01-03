import React, { useState } from 'react';
import { scaleBand, timeParse, timeFormat } from 'd3';
import Legend from './Legend';
import Axis from './Axis'
import Cell from './Cell';
import Tooltip from './Tooltip';

const HeatMap = ({ baseTemp, tempData }) => {
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

  const [tooltip, setTooltip] = useState(null);

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

  function handleMouseLeave() {
    setTooltip(null);
  }

  return (
    <div className="chart-container">
      <svg className="heat-map" viewBox={`0 0 ${w} ${h}`}>
        <Legend colorData={colorData} />
        <Axis className="x-axis" transform={`translate(0, ${h - margin.top})`} scale={xScale} />
        <Axis className="y-axis" transform={`translate(${margin.left}, 0)`} scale={yScale} />
        {tempData.map((cell, i) => <Cell key={i} cell={cell} x={xScale(cell.year)} y={yScale(timeParse('%m')(cell.month))} width={xScale.bandwidth()} height={yScale.bandwidth()} colorData={colorData} baseTemp={baseTemp} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />)}
      </svg>
      {tooltip && <Tooltip tooltip={tooltip} />}
    </div>
  );
}

export default HeatMap;
