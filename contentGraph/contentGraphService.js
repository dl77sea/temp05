// functions to partition case tree (serviceCase)
angular.module('app').service('contentGraphService', contentGraphService)
// servicePartition.$inject = ['contentGraphService', 'contentGraphService']

function contentGraphService() {
  var vm = this

  vm.initRatiosGraph = function() {
    vm.margin = {
        top: 5,
        right: 50,
        bottom: 20,
        left: 50
      },
      width = 600 - vm.margin.left - vm.margin.right,
      height = 250 - vm.margin.top - vm.margin.bottom;


    // parse the date / time
    vm.parseTime = d3.timeParse("%Y");
    // set the ranges
    vm.x = d3.scaleTime().range([0, width]);
    vm.y = d3.scaleLinear().range([height, 0]);

    // var threshX = d3.scaleTime().range([0, width]);
    // var threshY = d3.scaleLinear().range([height, 0]);

    // define the line
    vm.valueline = d3.line()
      .x(function(d) {
        return vm.x(d.year);
      })
      .y(function(d) {
        return vm.y(d.val);
      });
    vm.svgRatios = d3.select("#d3ratios").append("svg")
      .attr("width", width + vm.margin.left + vm.margin.right)
      .attr("height", height + vm.margin.top + vm.margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + vm.margin.left + "," + vm.margin.top + ")");

    vm.svgProbability = d3.select("#d3probability").append("svg")
      .attr("width", width + vm.margin.left + vm.margin.right)
      .attr("height", height + vm.margin.top + vm.margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + vm.margin.left + "," + vm.margin.top + ")");

  }
  vm.updateRatiosGraph = function() {
    vm.clearGraphs()
    vm.gMinMax;
    vm.gThresh = 1
    vm.gPadding = 0.05

    vm.startYear = 2014
    vm.endYear = 2090

    vm.arrYears = []
    for (let i = vm.startYear; i <= vm.endYear; i++) {
      vm.arrYears.push(vm.parseTime(i))
    }

    vm.x.domain(d3.extent(vm.arrYears, function(d) {
      return d;
    }));

    vm.gMinMax = d3.extent(vm.arrYears, function(d) {
      return d;
    })

    // y.domain([minMax[0] - gPadding, minMax[1] + gPadding]);
    vm.y.domain([0.65, 1.35]);


    d3.csv("./contentGraph/ratio00.csv", function(error, data) {
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

      for (data of valueLines) {

        // format the data
        data.forEach(function(d) {
          // d.year = parseTime(d.year.toString());
          d.year = vm.parseTime(d.year);
          d.val = parseFloat(d.val);
        });

        // Add the valueline path.
        vm.svgRatios.append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", vm.valueline);
      }
    });
    // Add thereshold line
    vm.svgRatios.append("line")
      .attr("class", "threshline")
      .attr("x1", vm.x(vm.gMinMax[0]))
      .attr("y1", vm.y(vm.gThresh))
      .attr("x2", vm.x(vm.gMinMax[1]))
      .attr("y2", vm.y(vm.gThresh))

    // Add the X Axis
    vm.svgRatios.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(vm.x).ticks(20));

    // Add the Y Axis
    vm.svgRatios.append("g")
      .call(d3.axisLeft(vm.y).ticks(20));

    //mean line

    let meanLine = []
    d3.csv("./contentGraph/ratiomean.csv", function(error, data) {
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
        obj.year = vm.parseTime(obj.year)
        obj.val = parseFloat(obj.val)
      }

      //plot mean line
      data = meanLine
      // Add the valueline path.
      vm.svgRatios.append("path")
        .data([data])
        .attr("class", "meanline")
        .attr("d", vm.valueline);
    })
  }

  vm.clearGraphs = function() {
    console.log("clear testgraph", vm.svgRatios._groups[0][0].lastChild)

    while (vm.svgRatios._groups[0][0].lastChild) {
      console.log("inside clearGraphs")
      vm.svgRatios._groups[0][0].removeChild(vm.svgRatios._groups[0][0].lastChild);
    }
    while (vm.svgProbability._groups[0][0].lastChild) {
      console.log("inside clearGraphs")
      vm.svgProbability._groups[0][0].removeChild(vm.svgProbability._groups[0][0].lastChild);
    }

  }
}
