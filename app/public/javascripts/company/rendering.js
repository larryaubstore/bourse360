define(["d3", "company/stockData", "company/chartparams"  ], function( d3_mod, stockData, chartparams) {


  var drawLine = function(params, container) {

    params.x = params.x + 50;

    var obj = [params];
    
    //var myg = svgContainer.selectAll(".myg").data(obj);
    var myg = container.selectAll(".myg").data(obj);
    myg.enter()
      .append("g")
      .attr("class", "myg")
      .attr("opacity", function(d) {
          return d.opacity;
      });

    
    var myline = myg.selectAll(".myline").data(obj);  
    myline.enter().append("line")
          .attr("class", "myline")
          .attr("x1", function(d) {
            return d.x;
          })
          .attr("x2", function(d) {
            return d.x;
          })
          .attr("y1", 0)
          .attr("y2", 30)
          .attr("stroke-dasharray", "2,2,2,2")
          .attr("style", "stroke-width: 1; stroke: black;");

    myline
      .attr("x1", function(d) {
          return d.x;
      })
      .attr("x2", function(d) {
          return d.x;
      })
      .attr("y1", 0)
      .attr("y2", chartparams.height + 20);
  };


  return {
    drawLine: drawLine
  };
});
