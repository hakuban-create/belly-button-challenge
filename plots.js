const url =
  "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";
const dataPromise = d3.json(url);
let dropDown = d3.select("#selDataset");
let dataset = [];

//fetching datasets
d3.json(url).then(function (data) {
  dataset = data;
  populateDropDown();
  //populating plot with 1st dataset
  optionChanged(0);
  populateDemoInfo(0);
});

function optionChanged(index) {
  populateDemoInfo(index);
  //populating bar chart
  let data = dataset.samples;
  let update = {
    x: [data[index].sample_values.slice(0, 10).reverse()],
    y: [
      data[index].otu_ids
        .slice(0, 10)
        .reverse()
        .map((each) => "OTU " + each),
    ],
    text: [data[index].otu_labels.slice(0, 10)],
  };
  Plotly.restyle("bar", update);

  //populating bubble chart
  let update2 = {
    x: [data[index].otu_ids],
    y: [data[index].sample_values],
    text: [data[index].otu_labels],
    "marker.size": [data[index].sample_values],
    "marker.color": [data[index].otu_ids],
  };
  let layoutUpdate = {
    xaxis: {
      title: "OTU ID",
    },
  };
  Plotly.restyle("bubble", update2);
  Plotly.relayout("bubble", layoutUpdate);
}

function populateDropDown() {
  dataset.names.forEach((element, index) => {
    dropDown.append("option").attr("value", index).text(element);
  });
}

function populateDemoInfo(index) {
  let placeholder = d3.select("#sample-metadata");
  placeholder.selectAll("div").remove();
  let metadata = dataset.metadata[index];
  for (var property in metadata) {
    placeholder.append("div").text(property + " : " + metadata[property]);
  }
}
