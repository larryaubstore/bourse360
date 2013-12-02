define(["d3", "company/stockData", "company/rendering", "company/chartparams"  ], function( d3_mod, stockData, renderer, chartparams) {


  var data = { stock: stockData.data_values };


  var zoomed = function () {

    var translate = zoom.translate();
    var scale = zoom.scale();

    console.log("translate => " + translate[0]);
    console.log("scale     => " + scale);

    chartparams.translateX = translate[0];
    chartparams.scale = scale;
    svg.select(".x.axis").call(chartparams.xAxis);
    svg.select(".y.axis").call(chartparams.yAxis);
    svg.selectAll(".area").attr("d", chartparams.area);

    var circle = svgContainer.selectAll("circle")
        .data(chartparams.circles, function(d) { return d.key; });

    circle.attr("cx", function (d) {
      return chartparams.x(data.stock[d.index][0]) + 50; 
    })
    .attr("cy", function (d) {
      return chartparams.y(data.stock[d.index][1]) + 15; 
    });

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

  window.translateXhook = function (p, l, translate) {
    var diff = p[0] - l[0];
    if(translate[0] + diff < 0) {
      return true;
    } else {
      return true;
    }
  };


  renderer.drawChart(svg, data, chartparams);
  renderer.drawXAxis(svg, chartparams);
  renderer.drawYAxis(svg, chartparams);

  d3.select("body").call(zoom);


  // d3_mod, stockData, renderer, chartparams
  return {
    d3: d3,
    data: data,
    chartparams: chartparams 
  };
  
});
