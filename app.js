async function draw() {
  // Data
  const dataset = await d3.json("./data.json");
  console.log(dataset[0]);

  const xAccessor = (d) => {
    return d.currently.humidity;
  };

  const yAccessor = (d) => {
    return d.currently.apparentTemperature;
  };

  //Dimensions
  let dimensions = {
    width: 800,
    height: 800,
    margin: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  };

  dimensions.ctrWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.ctrHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.left;

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const ctr = svg
    .append("g")
    .attr(
      "transform",
      `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
    );

  // Scales
  const xScales = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .rangeRound([0, dimensions.ctrWidth])
    .clamp(true);
  const yScales = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .rangeRound([dimensions.ctrHeight, 0])
    .nice()
    .clamp(true);
  //Draw Circles
  ctr
    .selectAll("circle")
    .data(dataset)
    .join((enter) => {
      return enter
        .append("circle")
        .attr("r", (d) => {
          return 5;
        })
        .attr("cx", (d) => xScales(xAccessor(d)))
        .attr("cy", (d) => yScales(yAccessor(d)))
        .attr("data-temp", yAccessor);
    })
    .attr("fill", "red");

  //Draw Axes
  const xAxes = d3
    .axisBottom(xScales)
    .ticks(5)
    .tickFormat((d) => {
      return d * 100 + "%";
    });
  //   const yAxes = d3.

  const xAxisGroup = ctr
    .append("g")
    .call(xAxes)
    .style("transform", `translateY(${dimensions.ctrHeight}px)`)
    .classed("axis", true);

  xAxisGroup
    .append("text")
    .text("Humidity")
    .attr("fill", "black")
    .attr("x", dimensions.ctrWidth / 2)
    .attr("y", dimensions.margin.bottom - 10);

  const yAxis = d3.axisLeft(yScales);
  const yAxisGroup = ctr.append("g").call(yAxis).classed("axis", true);
  yAxisGroup
    .append("text")
    .style("transform", "rotate(270deg)")
    .attr("x", -dimensions.ctrHeight / 2)
    .attr("y", -dimensions.margin.left + 15)
    .style("text-anchor", "middle")
    .attr("fill", "black")
    .html("Temperature &deg; F");
}

draw();
