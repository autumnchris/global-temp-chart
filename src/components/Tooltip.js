import React from 'react';

const Tooltip = ({ tooltip }) => {
  return <div className="tooltip" style={{ top: tooltip.top, left: tooltip.left }}>{tooltip.month} {tooltip.year}<br />{tooltip.temp}&deg;C<br />{tooltip.variance} variance</div>;
}

export default Tooltip;