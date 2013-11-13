requirejs(["d3", "company/stockData", "company/rendering", "company/chartparams"  ], function( d3_mod, stockData, renderer, chartparams) {


  var data = { stock: stockData.data_values };


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


  var svgContainer = d3.select("#chart").append("svg");
  renderer.drawContainer(svgContainer, data, chartparams); 
  var svg = d3.select("svg").append("g")
    .attr("transform", "translate(" + chartparams.margin.left + "," + chartparams.margin.top + ")");




  var zoom = d3.behavior.zoom()
      .x(chartparams.x)
      .y(chartparams.y)
      .scaleExtent([1, 10])
      .on("zoom", zoomed);


  renderer.drawXAxis(svg, chartparams);
  renderer.drawYAxis(svg, chartparams);
 
 


  d3.select("body").call(zoom);
  renderer.drawChart(svg, data, chartparams);
});
