define(["d3", "company/stockData", "company/chartparams"], function (d3_mod, stockData, chartparams) {

  var circles = [];

  var translateX = 0;
  var scale = 1;
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

  var data = { stock: stockData.data_values };
  var zoomed = function (params) {

    debugger;
    //var svg = chartparams.svg;
    var translate = zoom.translate();
    var myscale = zoom.scale();

    translateX = translate[0];
    scale = myscale;
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);
    svg.selectAll(".area").attr("d", area);

    var circle = svgContainer.selectAll("circle")
        .data(circles, function(d) { return d.key; });

    circle.attr("cx", function (d) {
      return x(data.stock[d.index][0]) + 50; 
    })
    .attr("cy", function (d) {
      return y(data.stock[d.index][1]) + 15; 
    });

  };


  var zoom = d3.behavior.zoom()
      .x(x)
      .y(y)
      .scaleExtent([1, 10])
      .on("zoom", zoomed);


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
    scale: scale,
    zoom: zoom,
    data: data
  };
});
