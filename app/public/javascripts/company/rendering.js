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

  var drawChart = function (container, data, chartparams) {


      var chartPath = container.selectAll(".area").data([data.stock]);
       chartPath.enter().append("path")
        .attr("class", "area")
        .attr("d", chartparams.areaZero)
        .on('mousemove', function (d, i) {
          var epoch = (new Date).getTime();      
          var x = d3.mouse(this)[0];
          var y = d3.mouse(this)[1];
        })
        .on('mouseout', function (d, i) {

        })
        .transition()
          .duration(3000)
          .attr("d", chartparams.area)
          .each("end", function () {
            console.log("update ...");

            chartPath
             .attr("d", chartparams.area);
          });
  };


  return {
    drawLine: drawLine,
    drawChart: drawChart
  };
});
