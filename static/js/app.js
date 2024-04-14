//initing default plotly
init();

function init() {
  data = [
    {
      x: [],
      y: [],
      text: [],
      type: "bar",
      orientation: "h",
    },
  ];
  Plotly.newPlot("bar", data);

  data2 = [
    {
      x: [],
      y: [],
      type: "scatter",
      mode: "markers",
      marker: { size: [], color: "" },
    },
  ];
  let layout = {
    xaxis: { title: "" },
  };
  Plotly.newPlot("bubble", data2, layout);
}
