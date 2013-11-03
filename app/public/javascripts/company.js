//var require = requirejs.config({
//  baseUrl: "/"
//});
requirejs(["d3", "company/stockData"  ], function( d3_mod, stockData) {


  var data = stockData.data_values;

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

//  var utcSeconds = 1234567890;
//  var d = new Date(0); 
//  d.setUTCSeconds(utcSeconds);

  var epochToDate = function(epochTime) {
    var epochZero = new Date(0);
    epochZero.setMilliseconds(epochTime);

    var dateFormatted = epochZero.getYear() + "-" + epochZero.getMonth() + "-" + epochZero.getDay();
    return dateFormatted;
  }

  var test = epochToDate(1382952960000);
  //var test = epochToDate(1234567890);

  //var parseDate = d3.time.format("%d-%b-%y").parse;


  var firstDate = new Date(2013, 0, 1, 0, 0, 0, 0);
  var secondDate = new Date(2014, 0, 1, 0, 0, 0, 0);


  var x = d3.time.scale()
      .range([0, width]);
      //.ticks(d3.time.minute, 15);

      
      //.range([firstDate, secondDate]);
      
  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");


  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(d) { 
        return x(d[0]); 
      })
      .y(function(d) { 
        return y(d[1]); 
      });

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("style", "margin:0 auto;width:960px;display:block")
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //d3.tsv("data.tsv", function(error, data) {

//  data.forEach(function(d) {
//    d.date = parseDate(d.date);
//    d.close = +d.close;
//  });

  var startingDate = new Date(2013, 1, 1);
  var endingDate = new Date(2013, 2, 1);

  var interval = endingDate.getTime() - startingDate.getTime();

  var pathSelection = [];

  //x.domain([startingDate, endingDate]);

  x.domain(d3.extent(data, function(d) { 
    return d[0]; 
//    //return startingDate.setUTCSeconds(
  }));
  y.domain(d3.extent(data, function(d) { 
    return d[1]; 
  }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");
//      .text("Price ($)");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .on('mouseover', function (d, i) {
        var epoch = (new Date).getTime();      
        var x = d3.mouse(this)[0];
        var y = d3.mouse(this)[1];

        var obj = {index: epoch, x: x, y: y};

        pathSelection.push(obj);
        //addCircle(pathSelection);
      })
      .on('mouseout', function (d, i) {
        setTimeout(function () {
          //pathSelection.pop();
          //addCircle(pathSelection);
        }, 600);
      });


  var addCircle = function(pathSelection) {
      var circle = svg.selectAll("circle").data(pathSelection, function(d) {
        return d.index; 
      });


      circle.enter()
        .append("circle")
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        })
        .attr("r", 0)
        .attr("fill", "red")
        .transition()
          .duration(500)
          .attr("r", 20);

      circle.exit()
        .transition()
          .duration(500)
          .attr("r", 0)
        .remove();
  };
      

//      //svg.data(pathSelection).enter().append("circle")
//      svg.data(pathSelection).append("circle")
//        .attr("cx", function (d) {
//          return d.x;
//        })
//        .attr("cy", function (d) {
//          return d.y;
//        })
//        .attr("r", 0)
//        .attr("fill", "red")
//        .transition()
//          .duration(1000)
//          .attr("r", 20);


});
