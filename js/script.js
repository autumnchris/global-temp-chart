function displayGraph() {

  axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then((dataset) => {
    const data = dataset.data.monthlyVariance;
    const colorData = [
      210,
      175,
      140,
      105,
      70,
      35,
      0
    ];
    const w = 1000;
    const h = 500;
    const padding = {
      top: 40,
      right: 30,
      bottom: 80,
      left: 90
    };
    const xScale = d3.scaleBand()
      .domain(data.map((d) => d.year))
      .range([padding.left, w - padding.right]);
    const yScale = d3.scaleBand()
      .domain(data.map((d) => d3.timeParse('%m')(d.month)))
      .range([padding.bottom, h - padding.top]);
    const svg = d3.select('.chart')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${h - padding.top})`)
      .call(d3.axisBottom(xScale)
      .tickValues(xScale.domain().filter((d) => d % 20 === 0)));

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${padding.left}, 0)`)
      .call(d3.axisLeft(yScale)
      .tickFormat(d3.timeFormat('%B')));

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('x', (d) => xScale(d.year))
      .attr('y', (d) => yScale(d3.timeParse('%m')(d.month)))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('fill', (d) => `hsl(${colorData[Math.floor((d.variance + dataset.data.baseTemperature) / 2)]}, 75%, 50%)`)
      .on('mouseover', handleMouseover)
      .on('mouseout', handleMouseout);

    function handleMouseover(d) {
      const tooltip = d3.select('.chart')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

      tooltip.transition()
        .duration(200)
        .style('opacity', 0.9);
      tooltip.html(`${d3.timeFormat('%B')(d3.timeParse('%m')(d.month))} ${d.year}<br/>${(dataset.data.baseTemperature + d.variance).toFixed(2)}&deg;C<br/>${d.variance > 0 ? '+' + d.variance.toFixed(2) : d.variance.toFixed(2)} variance`)
        .style('left', `${d3.event.pageX + 12}px`)
        .style('top', `${d3.event.pageY - 32}px`);
    }

    function handleMouseout() {
      d3.select('.tooltip').remove();
    }

    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(125, 25)');

    legend.selectAll('rect')
      .data(colorData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 30)
      .attr('y', 5)
      .attr('width', 30)
      .attr('height', 15)
      .attr('fill', (d) => `hsl(${d}, 75%, 50%)`)
      .attr('stroke', '#fff');

    legend.selectAll('text')
      .data(colorData)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * 30)
      .attr('y', 30)
      .text((d, i) => `${i * 2}+`)
      .style('font-size', '0.7rem');
  }).catch(() => {
    document.querySelector('.error-message').style.display = 'block';
  });
}

displayGraph();
