async function draw() {
  // Data
  const dataset = await d3.json("./data.json");
  console.log(dataset[0]);

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

  //Draw Circles
  ctr
    .selectAll("circle")
    .data(dataset)
    .join((enter) => {
      return enter
        .append("circle")
        .attr("r", (d) => {
          // console.log(d);
          return d.currently.humidity;
        })
        .attr("cx", (d) => {
          return d.currently.ozone;
        })
        .attr("cy", (d) => {
          return d.currently.temperature;
        });
    });
}
draw();
