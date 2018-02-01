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

var startYear = 2014
var endYear = 2090
var numYears = (endYear + 1) - startYear
/***figure out a better place to put this***/
// Scale the range of the data 2014-2090 (evenutally, user selected)
let arrYears = []
for (let i = startYear; i <= endYear; i++) {
  arrYears.push(parseTime(i))
}

console.log(arrYears)
x.domain(d3.extent(arrYears, function(d) {
  return d;
}));



/***figure out how to egt extent from aggrigate***/
// const minMax = d3.extent(data, function(d) {
//   return d.val;
// })
gMinMax = d3.extent(arrYears, function(d) {
  return d;
})
//--------------------------------------------

// y.domain([minMax[0] - gPadding, minMax[1] + gPadding]);
// y.domain([0.65, 1.25]);

//scale on y
// let minMax = d3.extent(data, function(d) {
//   return d.val;
// })
// console.log("mm ",minMax)
//works here y.domain([-0.05, 1.0]);
// y.domain([0.65, 1.25]);


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
  console.log("valueLines: ", valueLines)
  // get probability (for each date, in each line, count how many values are above thresh and divide by total valuelines to get y for that date)
  console.log("numYears: ", numYears)

  //for each "year slot" check all values in all lines for that year
  let probLine = []
  for (i = 0; i < numYears; i++) {
    let valsAbove = 0;
    for (valueLine of valueLines) {
      if(valueLine[i].val > gThresh) {
        valsAbove++
      }
    }
    // console.log(valueLine[i].year)
    let yearVal = parseTime(parseInt(valueLine[i].year))
    //why can't i call date key year?
    probLine.push ({year: yearVal, val: valsAbove/valueLines.length})
  }
  console.log("probLine: ", probLine)
  //plot mean line
  data = probLine

  console.log("prob line: ", data)

  // find out why this doesn't change numbers on y axis
  // let minMax = d3.extent(data, function(d) {
  //   return d.val;
  // })
  // console.log("mm ",minMax)
  // y.domain([minMax[0], minMax[1]]);

  y.domain([0, 1.0]);
  // Add the valueline path.
  svg.append("path")
    .data([data])
    .attr("class", "line2")
    .attr("d", valueline);

});
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

//mean line
