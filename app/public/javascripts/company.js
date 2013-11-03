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

  var firstDate = new Date(2013, 0, 1, 0, 0, 0, 0);
  var secondDate = new Date(2014, 0, 1, 0, 0, 0, 0);


  var x = d3.time.scale()
      .range([0, width]);
      
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

  var lineZero = d3.svg.line()
      .x(function(d) { 
        return 0; 
      })
      .y(function(d) { 
        return 0; 
      });



  var graphData = { zoom: 1 };

  var svg = d3.select("body").append("svg")
      .attr("height", 0) 
      .attr("width", width + margin.left + margin.right)
      .attr("style", "margin:0 auto;width:960px;display:block")
      .transition()
        .duration(1000)
        .attr("height", height + margin.top + margin.bottom);


    svg = d3.select("svg").append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//  var svg = d3.select("body").data(graphData);
//    svg.enter().append("svg")
//      .attr("width", width + margin.left + margin.right)
//      .attr("height", height + margin.top + margin.bottom)
//      .attr("style", "margin:0 auto;width:960px;display:block")
//    .append("g")
//      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var startingDate = new Date(2013, 1, 1);
  var endingDate = new Date(2013, 2, 1);

  var interval = endingDate.getTime() - startingDate.getTime();

  var pathSelection = [];

  x.domain(d3.extent(data, function(d) { 
    return d[0]; 
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
//
//
  
  //var chart = svg.select("#chart path.line").data(data);
  //

  //var chart = svg.select("#chart")
  //chart.enter()
  //
  
     svg.datum(data)
      .append("path")
      //.attr("class", "line")
      .attr("class", "area")
      .attr("d", lineZero)
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
      })
      .transition()
        .duration(1000)
        .attr("d", line);


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
});
