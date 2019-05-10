function displayChart() {

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
    const margin = {
      top: 50,
      right: 40,
      bottom: 90,
      left: 100
    };
    let w;
    let h;

    const xScale = d3.scaleBand()
      .domain(data.map((d) => d.year));
    const yScale = d3.scaleBand()
      .domain(data.map((d) => d3.timeParse('%m')(d.month)));
    const svg = d3.select('.chart')
      .append('svg');

    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(125, 35)');

    svg.append('g')
      .attr('class', 'x-axis');

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('fill', (d) => `hsl(${colorData[Math.floor((d.variance + dataset.data.baseTemperature) / 2)]}, 75%, 55%)`)
      .on('mouseover', handleMouseover)
      .on('mouseout', handleMouseout);

    function handleMouseover(d) {
      const tooltip = d3.select('.chart')
        .append('div')
        .attr('class', 'tooltip')
        .style('visibility', 'hidden');

      tooltip.transition()
        .duration(200)
        .style('visibility', 'visible');

      tooltip.html(`${d3.timeFormat('%B')(d3.timeParse('%m')(d.month))} ${d.year}<br/>${(dataset.data.baseTemperature + d.variance).toFixed(2)}&deg;C<br/>${d.variance > 0 ? '+' + d.variance.toFixed(2) : d.variance.toFixed(2)} variance`)
        .style('left', `${d3.event.pageX - 50}px`)
        .style('top', `${d3.event.pageY - 100}px`);
    }

    function handleMouseout() {
      d3.select('.tooltip').remove();
    }

    legend.selectAll('rect')
      .data(colorData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 60)
      .attr('y', 5)
      .attr('width', 60)
      .attr('height', 15)
      .attr('fill', (d) => `hsl(${d}, 75%, 55%)`)
      .attr('stroke', '#fff');

    legend.selectAll('text')
      .data(colorData)
      .enter()
      .append('text')
      .attr('x', (d, i) => i * 60)
      .attr('y', 30)
      .attr('fill', '#fff')
      .text((d, i) => `${i * 2}+`)
      .style('font-size', '0.7rem');

    function resize() {
      w = window.innerWidth * 0.9;

      if (w < 1000) {
        w = 1000;
        h = w * 0.8;
      }
      else {

        if (window.innerWidth < window.innerHeight) {
          h = window.innerHeight * 0.6;
        }
        else {
          h = window.innerHeight * 0.8;
        }
      }

      xScale.range([margin.left, w - margin.right]);
      yScale.range([margin.bottom, h - margin.top]);

      svg.attr('viewBox', `0 0 ${w} ${h}`);

      svg.select('.x-axis')
        .attr('transform', `translate(0, ${h - margin.top})`)
        .call(d3.axisBottom(xScale)
        .tickValues(xScale.domain().filter((d) => d % 20 === 0)));

      svg.select('.y-axis')
        .call(d3.axisLeft(yScale)
        .tickFormat(d3.timeFormat('%B')));

      svg.selectAll('.cell')
        .attr('x', (d) => xScale(d.year))
        .attr('y', (d) => yScale(d3.timeParse('%m')(d.month)))
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth());
    }

    resize();

    d3.select(window)
      .on('resize', resize);
  }).catch(() => {
    document.querySelector('.error-message').style.display = 'block';
  });
}

displayChart();
