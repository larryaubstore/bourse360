define(function( ) {



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
      .attr("stroke-width", function(d) { return d.r / 3.5; })

    .on("mouseover", function(d) {
      d3.select("circle").transition()
        .duration(750)
        .attr("stroke", "red");
    })

    .on("mouseout", function(d) {
      d3.select("circle").transition()
        .duration(750)
        .attr("stroke", "green");
    })

    .on("dblclick", function() {

      //d3.select('#slider_facer').call(d3.slider().axis(true).min(2000).max(2100).step(5));
      debugger;
    });
  };


  var ShowDebug = function(svg, data) {


  }


  return {
    Render: Render
  };
});
