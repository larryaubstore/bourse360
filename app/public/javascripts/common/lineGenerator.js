define(function() {


  var _svg;
  var _data;

  var Render = function(svg, data) {

  };


//  var Render = function (svg, data) {
//
//    _svg  = svg;
//    _data = data;
//
//
//    var line = d3.svg.line()
//      .x(function(d) { return d.x; })
//      .y(function(d) { return d.y; })
//      .interpolate("basis");
//      //.interpolate(function(points) { return points.join("A 1,1 0 0 1 "); });
//
//    var testData = [{x: 10, y: 10},
//                    {x: 55, y: 15},
//                    {x: 100, y: 20},
//                    {x: 150, y: 25},
//                    {x: 300, y: 300}];
//
//
//    _svg.append("path")
//      //.attr("d", line(testData) + "Z")
//      .attr("d", line(testData))
//      .attr("stroke", "blue")
//      .attr("stroke-width", 2)
//      .attr("fill", "none");
//
//  };

  return {
    Render: Render
  }

});
