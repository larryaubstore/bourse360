define(["../common/faceThumbnail"  ], function( faceThumbnail) {


  var Render = function (svg, data) {
    svg.selectAll("circle")
      .data(data)
    .enter().append("circle")
      .attr("r", function(d) { return d.r; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
//      .style("fill", function(d) { return d.color; });
      .attr("fill", function(d) { return "none"; })
      .attr("stroke", function(d) { return d.color; })
      .attr("stroke-width", function(d) { return d.r / 2; })
      
  };


  return {
    Render: Render
  };
});
