// functions to partition case tree (serviceCase)
angular.module('app').service('contentGraphService', contentGraphService)
// servicePartition.$inject = ['contentGraphService', 'contentGraphService']
// contentGraphService.$inject = ['$rootScope']
function contentGraphService() {
  var vm = this
  vm.threshold = null;
  vm.initRatiosGraph = function() {

    vm.margin = {
        top: 5,
        right: 50,
        bottom: 20,
        left: 50
      },
      width = 800 - vm.margin.left - vm.margin.right,
      height = 280 - vm.margin.top - vm.margin.bottom;

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
    console.log("hello from updateRatiosGraph ", vm.threshold)
    vm.clearGraphs()
    vm.gMinMax;
    vm.gThresh = vm.threshold
    // vm.gPadding = 0.05

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

  vm.updateProbabilityGraph = function() {
    // vm.clearGraphs()
      let width = 800 - vm.margin.left - vm.margin.right
      let height = 280 - vm.margin.top - vm.margin.bottom

    // parse the date / time
    vm.parseTimeProb = d3.timeParse("%Y");
    // set the ranges
    vm.xProb = d3.scaleTime().range([0, width]);
    vm.yProb = d3.scaleLinear().range([height, 0]);

    // var threshX = d3.scaleTime().range([0, width]);
    // var threshY = d3.scaleLinear().range([height, 0]);

    // define the line
    vm.valuelineProb = d3.line()
      .x(function(d) {
        return vm.xProb(d.year);
      })
      .y(function(d) {
        return vm.yProb(d.val);
      });

    vm.gMinMaxProb;
    vm.gThreshProb = vm.threshold
    vm.gPaddingProb = 0.05

    vm.startYearProb = 2014
    vm.endYearProb = 2090
    vm.numYears = (vm.endYear + 1) - vm.startYear
    vm.arrYearsProb = []
    for (let i = vm.startYearProb; i <= vm.endYearProb; i++) {
      vm.arrYearsProb.push(vm.parseTimeProb(i))
    }

    vm.xProb.domain(d3.extent(vm.arrYearsProb, function(d) {
      return d;
    }));

    vm.gMinMaxProb = d3.extent(vm.arrYearsProb, function(d) {
      return d;
    })

    // y.domain([minMax[0] - gPadding, minMax[1] + gPadding]);
    vm.yProb.domain([0.0, 1.0]);
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

      // get probability (for each date, in each line, count how many values are above thresh and divide by total valuelines to get y for that date)
      //for each "year slot" check all values in all lines for that year
      let probLine = []
      for (i = 0; i < vm.numYears; i++) {
        console.log("Snarf")
        let valsAbove = 0;
        for (valueLine of valueLines) {
          if (valueLine[i].val > vm.gThreshProb) {
            valsAbove++
          }
        }
        // console.log(valueLine[i].year)
        let yearVal = vm.parseTimeProb(parseInt(valueLine[i].year))
        //why can't i call date key year?
        probLine.push({
          year: yearVal,
          val: valsAbove / valueLines.length
        })
      }

      //plot mean line
      data = probLine
      console.log("probline: ", probLine)
      // vm.yProb.domain([0, 1.0]);

      // Add the valueline path.
      vm.svgProbability.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", vm.valuelineProb);

    });

    // Add thereshold line
    vm.svgProbability.append("line")
      .attr("class", "line")
      .attr("x1", vm.xProb(vm.gMinMaxProb[0]))
      .attr("y1", vm.yProb(vm.gThreshProb))
      .attr("x2", vm.xProb(vm.gMinMaxProb[1]))
      .attr("y2", vm.yProb(vm.gThreshProb))

    // Add the X Axis
    vm.svgProbability.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(vm.xProb).ticks(20));

    // Add the Y Axis
    vm.svgProbability.append("g")
      .call(d3.axisLeft(vm.yProb).ticks(20));
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
