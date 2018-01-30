angular.module('app').component('contentGraph', {
  templateUrl: './contentGraph/contentGraph.html',
  controller: ContentGraph
  // bindings: {}
})


// Toolbar.$inject = ['serviceSvg','serviceCase', 'servicePartition']
// function Toolbar(serviceSvg, serviceCase, servicePartition) {

function ContentGraph() {
  var ctrl = this
  // ctrl.map = null

  ctrl.$onInit = function() {
    console.log("content map init")
    /*start d3 append*/
    // set the dimensions and margins of the graph
    // var margin = {top: 20, right: 50, bottom: 30, left: 50},
    var margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
      },
      width = 300 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

    // parse the date / time
    // var parseTime = d3.timeParse("%d-%b-%y");
    var parseTime = d3.timeParse("%Y");
    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
      .x(function(d) {
        return x(d.snarf);
      })
      .y(function(d) {
        return y(d.blarf);
      });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    // var svg = d3.select("body").append("svg")
    var svg = d3.select("#d3-content").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    // d3.csv("test00.csv", function(error, data) {
    d3.csv("test00.csv", function(error, data) {
      // if (error) throw error;

      // format the data
      // data.forEach(function(d) {
      //     d.snarf = parseTime(d.snarf);
      //     console.log("parseTime from forEach: ", d.snarf)
      //     d.blarf = +d.blarf;
      // });

      data = [{
        snarf: "2012",
        blarf: 3
      }, {
        snarf: "2013",
        blarf: 5
      }, {
        snarf: "2014",
        blarf: 12
      }]
      data.forEach(function(d) {
        d.snarf = parseTime(d.snarf);
        console.log("parseTime from forEach: ", d.snarf)
        // d.blarf = +d.blarf;
      });

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) {
        return d.snarf;
      }));
      // y.domain([0, d3.max(data, function(d) { console.log("--",d); return d.blarf; })]);
      y.domain(d3.extent(data, function(d) {
        console.log("--", d);
        return d.blarf;
      }));
      console.log("this is the data: ", data)
      // data = [{snarf: 2012, blarf: 3},{snarf: 2013, blarf: 5},{snarf: 2014, blarf: 12}]
      console.log("this is the data: ", data)
      // Add the valueline path.
      svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

      // Add the X Axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(1));

      // Add the Y Axis
      svg.append("g")
        .call(d3.axisLeft(y).ticks(2));
    });
    /*end d3 append*/
  }
}
