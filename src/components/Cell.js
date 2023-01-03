import React from 'react';

const Cell = ({ cell, x, y, width, height, colorData, baseTemp, handleMouseEnter, handleMouseLeave }) => {
  return <rect className={`cell ${cell.month}-${cell.year}`} x={x} y={y} width={width} height={height} fill={`hsl(${colorData[Math.floor((cell.variance + baseTemp) / 2)]}, 75%, 55%)`} onMouseEnter={event => handleMouseEnter(event, cell)} onMouseLeave={() => handleMouseLeave()}></rect>;
}

export default Cell;