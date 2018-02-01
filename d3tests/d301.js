// set the dimensions and margins of the graph
// var margin = {top: 20, right: 50, bottom: 30, left: 50},
var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  },
  width = 1000 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;


// parse the date / time
var parseTime = d3.timeParse("%Y");
// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// var threshX = d3.scaleTime().range([0, width]);
// var threshY = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
  .x(function(d) {
    return x(d.year);
  })
  .y(function(d) {
    return y(d.val);
  });

var svg = d3.select("#content").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

//get an array of objects where
//each obj in arr should be like:
//  {year: "2012", val: "3.0"}
//per value line

// Get the data
// d3.csv("test01.csv", function(error, data) {
//   if (error) throw error;

var gMinMax;
var gThresh = 1
var gPadding = 0.05

d3.csv("ratio00.csv", function(error, data) {
  if (error) throw error;

  //for each object, make it an array as above for each value line
  let valueLines = []
  for (valueLineObj of data) {
    let valueLine = []
    for (key in valueLineObj) {
      if (key !== "") valueLine.push({
        year: key,
        val: valueLineObj[key]
      })
    }
    valueLines.push(valueLine)
  }

  // data = valueLines[0]

  colorInc = 0;
  colors = ["line3"]
  for (data of valueLines) {

  // data = valueLines[0]

    // format the data
    data.forEach(function(d) {
      // d.year = parseTime(d.year.toString());
      d.year = parseTime(d.year);
      d.val = parseFloat(d.val);
    });
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) {
      return d.year;
    }));

    const minMax = d3.extent(data, function(d) {
      return d.val;
    })

    gMinMax = d3.extent(data, function(d) {
      return d.year;
    })

    // y.domain([minMax[0] - gPadding, minMax[1] + gPadding]);
    y.domain([0.65, 1.25]);
    // Add the valueline path.
    if(colorInc === 2) {
      colorClass="line3"
      console.log("testLine: ",data)

    } else {
      colorClass="line"
    }
    colorInc++
    svg.append("path")
      .data([data])
      .attr("class", colorClass)
      .attr("d", valueline);
  }

  // svg.append("path")
  //     .attr("class", "line")
  //     .attr("d", function(d) { return line(d.values); })
  //     .style("stroke", function(d) { return z(d.id); });


  // Add thereshold line
  svg.append("line")
    .attr("class", "line")
    .attr("x1", x(gMinMax[0]))
    .attr("y1", y(gThresh))
    .attr("x2", x(gMinMax[1]))
    .attr("y2", y(gThresh))

  // Add the X Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(20));

  // Add the Y Axis
  svg.append("g")
    .call(d3.axisLeft(y).ticks(20));
});

//mean line

let meanLine = []
d3.csv("ratiomean.csv", function(error, data) {
  if (error) throw error;

  //build mean line
  for (obj of data) {
    meanLine.push({
      year: obj[""],
      val: obj[0]
    })
  }
  //format values in valueLine
  for (obj of meanLine) {
    obj.year = parseTime(obj.year)
    obj.val = parseFloat(obj.val)
  }


  //plot mean line
  data = meanLine
  console.log("mean linee: ", data)

  // Add the valueline path.
  svg.append("path")
    .data([data])
    .attr("class", "line2")
    .attr("d", valueline);

  // for (data of meanLine) {
  // Scale the range of the data
  // x.domain(d3.extent(data, function(d) {
  //   return d.year;
  // }));
  //
  // let minMax = d3.extent(data, function(d) {
  //   return d.val;
  // })
  //
  // y.domain([minMax[0] - gPadding, minMax[1] + gPadding]);


})
