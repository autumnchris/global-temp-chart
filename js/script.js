function displayGraph() {

  axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then((dataset) => {
    const data = dataset.data.monthlyVariance;
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
  }).catch(() => {
    document.querySelector('.error-message').style.display = 'block';
  });
}

displayGraph();
