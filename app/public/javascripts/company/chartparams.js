define(["d3", "company/stockData"], function (d3_mod, stockData) {

  var circles = [];

  var translateX = 0;
  var scaleX = 0;
  var margin = {top: 20, right: 20, bottom: 30, left: 50};
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var area = d3.svg.area()
      .x(function(d) { 
        return x(d[0]); 
      })
      .y0(height)
      .y1(function(d) { 
        return y(d[1]); 
      });

  var areaZero = d3.svg.area()
      .x(function(d) { 
        return x(d[0]); 
      })
      .y0(height)
      .y1(function(d) { 
        return 0; 
      });

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");


  var yAxis = d3.svg.axis()
       .scale(y)
       .ticks(15)
       .tickSize(-1)
       .orient("left");

  var xMinMax = d3.extent(stockData.data_values, function(d) {
    return d[0];
  });

  var yMinMax = d3.extent(stockData.data_values, function(d) {
    return d[1];
  });


  x.domain(xMinMax); 
  y.domain(yMinMax);

  return {
    width: width,
    height: height,
    margin: margin, 
    x: x,
    y: y,
    area: area,
    areaZero: areaZero,
    xAxis: xAxis,
    yAxis: yAxis,
    xMinMax: xMinMax,
    yMinMax: yMinMax,
    circles: circles,
    translateX: translateX,
    scaleX: scaleX
  };
});
