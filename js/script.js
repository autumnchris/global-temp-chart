function displayGraph() {

  axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then((dataset) => {
    const w = 1000;
    const h = 500;
    const svg = d3.select('.chart')
      .append('svg')
      .attr('width', w)
      .attr('height', h);
  }).catch(() => {
    document.querySelector('.error-message').style.display = 'block';
  });
}

displayGraph();
