requirejs(["d3", "company/stockData", "company/rendering", "company/chartparams"  ], function( d3_mod, stockData, renderer, chartparams) {


  var data = { stock: stockData.data_values };
  //data.area = chartparams.area;
  //data.areaZero = chartparams.areaZero;


  //var x = chartparams.x;
  //var y = chartparams.y;
  //var area = chartparams.area;
  //var areaZero = chartparams.areaZero;



//  var margin = {top: 20, right: 20, bottom: 30, left: 50},
//      width = 960 - margin.left - margin.right,
//      height = 500 - margin.top - margin.bottom;



  var zoomed = function () {
    console.log("zoom ...");
//    data.area = d3.svg.area()
//      .x(function(d) { 
//        return x(d[0]); 
//      })
//      .y0(chartparams.height)
//      .y1(function(d) { 
//        return y(d[1]); 
//      });


    svg.select(".x.axis").call(chartparams.xAxis);
    svg.select(".y.axis").call(chartparams.yAxis);
  };


  var graphData = { zoom: 1 };
  var pathSelection = [];


  var isAdded = false;

  var svgContainer = d3.select("#chart").append("svg");
     svgContainer.attr("height", 0) 
      .attr("width", chartparams.width + chartparams.margin.left + chartparams.margin.right)
     .on('mousemove', function () {
        var xMouse = d3.mouse(this)[0] - 50;
        var yMouse = d3.mouse(this)[1];

        renderer.drawLine({opacity: 1, x: xMouse, y: yMouse }, svgContainer);
        
      })
      .transition()
        .duration(1000)
        .attr("height", chartparams.height + chartparams.margin.top + chartparams.margin.bottom);

    svgContainer.on('click', function () {
      var xMouse = d3.mouse(this)[0] - 50;
      var yMouse = d3.mouse(this)[1];

      var xInterpolate = 1 - (chartparams.width - xMouse) / (chartparams.width  );
      var yInterpolate = 1 - (chartparams.height - yMouse) / (chartparams.height );

      var xIndex = Math.ceil(xInterpolate * data.stock.length);
      var yIndex = Math.ceil(yInterpolate * data.stock.length);

      var xConvert = chartparams.x(data.stock[xIndex][0]); 
      var yConvert = chartparams.y(data.stock[xIndex][1]);

      var obj = [{ x: xConvert, y: yConvert}];
      addCircle(obj, d3.mouse(this)[0], d3.mouse(this)[1]);
    });

 

    svg = d3.select("svg").append("g")
          .attr("transform", "translate(" + chartparams.margin.left + "," + chartparams.margin.top + ")");


  var xMinMax = d3.extent(data.stock, function(d) {
    return d[0];
  });

  var yMinMax = d3.extent(data.stock, function(d) {
    return d[1];
  });


  chartparams.x.domain(xMinMax); 
  chartparams.y.domain(yMinMax);

  var zoom = d3.behavior.zoom()
      .x(chartparams.x)
      .y(chartparams.y)
      .scaleExtent([1, 10])
      .on("zoom", zoomed);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + chartparams.height + ")")
      .call(chartparams.xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(chartparams.yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");


 
 

  var addCircle = function(arg, mouseX, mouseY) {

      var circle = svgContainer
        .append("circle");


        circle.attr("cx", function (d) {
          return mouseX;
        })
        .attr("cy", function (d) {
          return mouseY;
        })
        .attr("r", 0)
        .attr("fill", "red")
        .transition()
          .duration(500)
          .attr("r", 5)
          .transition()
            .duration(500)
            .attr("cx", function (d) {
              return arg[0].x + 50;
            })
            .attr("cy", function (d) {
              return arg[0].y + 15;
            })
            .each("end", function() {
              d3.select(this).on("mouseover", function(d) {
                    d3.select(this).transition()
                      .duration(500)
                      .attr("fill", "green");
                  });

              d3.select(this).on("mouseout", function(d) {
                d3.select(this).transition()
                  .duration(500)
                  .attr("fill", "red");
              });
            });


  };

  d3.select("body").call(zoom);
  renderer.drawChart(svg, data, chartparams);
});
