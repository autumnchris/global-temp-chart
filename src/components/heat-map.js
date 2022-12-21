import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import LoadingSpinner from './Loading-Spinner';
import ErrorMessage from './Error-Message';

const HeatMap = () => {
  const margin = {
    top: 50,
    right: 40,
    bottom: 90,
    left: 100
  };
  const w = 800;
  const h = w * 0.5;
  const colorData = [
    210,
    175,
    140,
    105,
    70,
    35,
    0
  ];
  let baseTemperature = null;

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [loadSuccess, setLoadSuccess] = useState(false);

  useEffect(() => {
    d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(dataset => {
      setLoadingStatus(false);
      setLoadSuccess(true);
      baseTemperature = dataset.baseTemperature;

      const xScale = d3.scaleBand()
        .domain(dataset.monthlyVariance.map((d) => d.year))
        .range([margin.left, w - margin.right]);
      const yScale = d3.scaleBand()
        .domain(dataset.monthlyVariance.map((d) => d3.timeParse('%m')(d.month)))
        .range([margin.bottom, h - margin.top]);
      
      d3.select('.legend').selectAll('.legend-color')
        .data(colorData)
        .enter()
        .append('rect')
        .attr('class', 'legend-color')
        .attr('x', (d, i) => i * 60)
        .attr('y', 5)
        .attr('width', 60)
        .attr('height', 15)
        .attr('fill', (d) => `hsl(${d}, 75%, 55%)`)
        .attr('stroke', 'hsl(0, 0%, 20%)');

      d3.select('.legend').selectAll('.legend-label')
        .data(colorData)
        .enter()
        .append('text')
        .attr('class', 'legend-label')
        .attr('x', (d, i) => i * 60)
        .attr('y', 30)
        .attr('fill', 'hsl(0, 0%, 100%)')
        .text((d, i) => `${i * 2}\u00B0C`)
        .style('font-size', '0.7rem');

      d3.select('.x-axis')
        .call(d3.axisBottom(xScale)
        .tickValues(xScale.domain().filter((d) => d % 20 === 0)));

      d3.select('.y-axis')
        .call(d3.axisLeft(yScale)
        .tickFormat(d3.timeFormat('%B')));

      d3.select('.heat-map').selectAll('.cell')
        .data(dataset.monthlyVariance)
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .attr('class', (d) => `${d.month}-${d.year}`)
        .attr('x', (d) => xScale(d.year))
        .attr('y', (d) => yScale(d3.timeParse('%m')(d.month)))
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth())
        .attr('fill', (d) => `hsl(${colorData[Math.floor((d.variance + dataset.baseTemperature) / 2)]}, 75%, 55%)`)
        .on('mouseover', handleMouseover)
        .on('mouseout', handleMouseout);
    }).catch(() => {
      setLoadingStatus(false);
      setLoadSuccess(false);
    });
  }, []);

  function handleMouseover(event, d) {
    const tooltip = d3.select('.chart-container')
      .append('div')
      .attr('class', 'tooltip')
      .style('visibility', 'hidden');

    tooltip.transition()
      .duration(200)
      .style('visibility', 'visible');

    tooltip.html(`${d3.timeFormat('%B')(d3.timeParse('%m')(d.month))} ${d.year}<br/>${(baseTemperature + d.variance).toFixed(2)}&deg;C<br/>${d.variance > 0 ? '+' + d.variance.toFixed(2) : d.variance.toFixed(2)} variance`)
      .style('left', `${(event.pageX - 50)}px`)
      .style('top', `${(event.pageY - 70)}px`);
  }

  function handleMouseout() {
    d3.select('.tooltip').remove();
  }

  return (
    <div className="chart-container">
      {loadingStatus ? <LoadingSpinner /> : loadSuccess ? <svg className="heat-map" viewBox={`0 0 ${w} ${h}`}>
        <g className="legend" transform="translate(125, 35)"></g>
        <g className="x-axis" transform={`translate(0, ${h - margin.top})`} style={{ fontFamily: "'Noto Sans', sans-serif" }}></g>
        <g className="y-axis" transform={`translate(${margin.left}, 0)`} style={{fontFamily: "'Noto Sans', sans-serif"}}></g>
      </svg> : <ErrorMessage />}
    </div>
  );
}

export default HeatMap;