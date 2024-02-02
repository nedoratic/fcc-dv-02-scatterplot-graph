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

// Drawing Canvas
let drawCanvas = () => {
	svg.attr("width", width);
	svg.attr("height", height);
};

// Drawing Points
let drawPoints = () => {
	svg
		.selectAll("circle")
		.data(values)
		.enter()
		.append("circle")
		.attr("class", "dot")
		.attr("r", "5")
		.attr("data-xvalue", (item) => item["Year"])
		.attr("data-yvalue", (item) => new Date(item["Seconds"] * 1000))
		.attr("cx", (item) => xScale(item["Year"]))
		.attr("cy", (item) => yScale(new Date(item["Seconds"] * 1000)))
		.attr("fill", (item) => (item["URL"] === "" ? "green" : "orange"))
		.on("mouseover", (item) => {
			tooltip.transition().style("visibility", "visible");
			tooltip.text(`${item["Year"]} - ${item["Name"]} - ${item["Time"]} - ${item["Doping"] !== "" ? item["Doping"] : "No Allegations"}`);
			tooltip.attr("data-year", item["Year"]);
		})
		.on("mouseout", (item) => {
			tooltip.transition().style("visibility", "hidden");
		});
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
