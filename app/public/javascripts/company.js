requirejs(["d3", "company/stockData", "company/rendering", "company/chartparams"  ], function( d3_mod, stockData, renderer, chartparams) {


  var data = { stock: stockData.data_values };


  d3.behavior.zoom.translateXhook = function (p, l, translate) {
    //translate[0] += p[0] - l[0];
    //
    var diff = p[0] - l[0];

    if(translate[0] + diff < 0) {
      return false;
    } else {
      return false;
    }
  };

  var zoomed = function () {

    var translate = zoom.translate();

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


  renderer.drawChart(svg, data, chartparams);
  renderer.drawXAxis(svg, chartparams);
  renderer.drawYAxis(svg, chartparams);
 
 


  d3.select("body").call(zoom);
});
