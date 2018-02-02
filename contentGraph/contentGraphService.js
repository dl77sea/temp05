// functions to partition case tree (serviceCase)
angular.module('app').service('contentGraphService', contentGraphService)
// servicePartition.$inject = ['contentGraphService', 'contentGraphService']

function contentGraphService() {
  var vm = this

  //create SVG element and set it's scaling for d3
  vm.graphInit = function() {
    console.log("graphInit from service")
    vm.clickedCoords = {}
    // // set the dimensions and margins of the graph
    // // var margin = {top: 20, right: 50, bottom: 30, left: 50},
    vm.margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
      },
      width = 300 - vm.margin.left - vm.margin.right,
      height = 200 - vm.margin.top - vm.margin.bottom;

    // // parse the date / time
    // // var parseTime = d3.timeParse("%d-%b-%y");
    vm.parseTime = d3.timeParse("%Y");
    // // set the ranges
    vm.x = d3.scaleTime().range([0, width]);
    vm.y = d3.scaleLinear().range([height, 0]);

    // // define the line
    vm.valueline = d3.line()
      .x(function(d) {
        return vm.x(d.snarf);
      })
      .y(function(d) {
        return vm.y(d.blarf);
      });

    // // append the svg obgect to the body of the page
    // // appends a 'group' element to 'svg'
    // // moves the 'group' element to the top left margin
    // // var svg = d3.select("body").append("svg")
    vm.svg = d3.select("#d3-content").append("svg")
      .attr("width", width + vm.margin.left + vm.margin.right)
      .attr("height", height + vm.margin.top + vm.margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + vm.margin.left + "," + vm.margin.top + ")");
  }

  vm.updateRatiosGraph = function() {

  }

  vm.clearRatiosGraph = function() {

  }

  vm.clearTestGraph = function() {
    console.log("clear testgraph",vm.svg._groups[0][0].lastChild)

    while (vm.svg._groups[0][0].lastChild) {
      console.log("inside clearTestGraph")
      vm.svg._groups[0][0].removeChild(vm.svg._groups[0][0].lastChild);
    }
  }

  vm.testGraph = function() {
    console.log("testgraph")
    console.log("contentGraphService clickedCoords: ", vm.clickedCoords)
    vm.clearTestGraph()
    // /*start d3 append*/
    // // Get the data
    // // d3.csv("test00.csv", function(error, data) {
    d3.csv("test00.csv", function(error, data) {
      //   // if (error) throw error;
      //
      // format the data
      data.forEach(function(d) {
        d.snarf = vm.parseTime(d.snarf);
        console.log("parseTime from forEach: ", d.snarf)
        d.blarf = +d.blarf;
      });

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
        d.snarf = vm.parseTime(d.snarf);
        console.log("parseTime from forEach: ", d.snarf)
        // d.blarf = +d.blarf;
      });

      // Scale the range of the data
      vm.x.domain(d3.extent(data, function(d) {
        return d.snarf;
      }));
      // y.domain([0, d3.max(data, function(d) { console.log("--",d); return d.blarf; })]);
      vm.y.domain(d3.extent(data, function(d) {
        console.log("--", d);
        return d.blarf;
      }));
      console.log("this is the data: ", data)
      // data = [{snarf: 2012, blarf: 3},{snarf: 2013, blarf: 5},{snarf: 2014, blarf: 12}]
      console.log("this is the data: ", data)
      // Add the valueline path.
      vm.svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", vm.valueline);

      // Add the X Axis
      vm.svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(vm.x).ticks(1));

      // Add the Y Axis
      vm.svg.append("g")
        .call(d3.axisLeft(vm.y).ticks(2));
    });
    // /*end d3 append*/
  }
}
