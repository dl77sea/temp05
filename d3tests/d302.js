var svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var parseTime = d3.timeParse("%Y%m%d");
var parseTime = d3.timeParse("%Y");

//create functions for fitting data onto 2D plane
var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

    console.log("x: ", x)
    console.log("y: ", y)
    console.log("z: ", z)

//make a line object (empty for now) to later hold (be deformed by) values from csv values
var line = d3.line()
    // .curve(d3.curveBasis)
    // .x(function(d) { console.log(d.date); return x(d.date); })
    // .y(function(d) { console.log(d.temperature); return y(d.temperature); });
    .x(function(d) { return x(d.date); })
    // console.log("---",d.temperature); 
    .y(function(d) { return y(d.temperature); });
    // .y(function(d) { return y(1); });
    // console.log("line: ",line)

    // d3.tsv("data.tsv", type, function(error, data) {
    //   if (error) throw error;
    //
    //   var cities = data.columns.slice(1).map(function(id) {
    //     return {
    //       id: id,
    //       values: data.map(function(d) {
    //         return {date: d.date, temperature: d[id]};
    //       })
    //     };
    //   });


    // d3.csv("ratio.csv", type, function(error, data) {
    d3.csv("ratio.csv", function(error, data) {
      if (error) throw error;

    // like this:
    //   [
    //     //row objects
    //     { id: row-first-element,
    //       values: [ {year: flow-val}... ]
    //     }...
    //   ]

  //get id: to be first element in row
  //get values: to be year: flow-val

  var checkVal = "0.05"
  var valueLines = []

  for(obj of data) {
    let valueLine = {id: "f", values: []}
    for(key in obj) {
      if(obj[key] !== checkVal && obj[key] !== null) {
        // valueLine.values.push({date: new Date(parseInt(key), 1), temperature: obj[key]})
        // console.log(key)
        // console.log(parseTime(key))

        valueLine.values.push({date: parseTime(key), temperature: parseFloat(obj[key])})
        //  d.snarf = parseTime(d.snarf.toString());
        // valueLine.values.push({date: key, temperature: obj[key]})
        // console.log()
      }
    }
    valueLines.push(valueLine)
  }
  // console.log("valueLines[0] ",valueLines[0])

  cities = valueLines;

  console.log(cities)

  //set range of dates along x axis to entire range of dates in csv
  x.domain(d3.extent(data, function(d) { return d.date; }));

  //set range of values (flow ratio?) along y axis to whole range in csv per
  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
  ]);

  //generate each year's value line
  z.domain(cities.map(function(c) { return c.id; }));

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Temperature, ºF");

  var city = g.selectAll(".city")
    .data(cities)
    .enter().append("g")
    .attr("class", "city");

  // console.log(city.attr("d", function(d) { return line(d.values); }))
  city.append("path")
      .attr("class", "line")

      // .attr("d", function(d) { console.log(line(d.values)); return line(d.values); })
      .attr("d", function(d) { return line(d.values); })
      // .style("stroke", function(d) { return z(d.id); });

  // city.append("text")
  //     .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
  //     .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
  //     .attr("x", 3)
  //     .attr("dy", "0.35em")
  //     .style("font", "10px sans-serif")
  //     .text(function(d) { return d.id; });

});

function type(d, _, columns) {
  // console.log("-----",d)
  d.date = parseTime(d.date);
  for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
  return d;
}
