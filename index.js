// URL variable
let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

// XMLHttpRequest variable
let req = new XMLHttpRequest();

let values = [];

let xScale;
let yScale;

let xAxis;
let yAxis;

let width = 800;
let height = 600;
let padding = 40;

let svg = d3.select("svg");
let tooltip = d3.select("#tooltip");

// Generating Scales
let generateScales = () => {
	xScale = d3
		.scaleLinear()
		.domain([d3.min(values, (item) => item["Year"]) - 1, d3.max(values, (item) => item["Year"]) + 1])
		.range([padding, width - padding]);

	yScale = d3
		.scaleTime()
		.domain([d3.min(values, (item) => new Date(item["Seconds"] * 1000)), d3.max(values, (item) => new Date(item["Seconds"] * 1000))])
		.range([padding, height - padding]);
};

// Fetching JSON Data
req.open("GET", url, true);
req.onload = () => {
	values = JSON.parse(req.responseText);
	console.log(values);
	drawCanvas();
	generateScales();
	drawPoints();
	generateAxes();
};
req.send();
