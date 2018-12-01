function displayGraph() {

  axios.get('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then((dataset) => {
  }).catch(() => {
  });
}

displayGraph();
