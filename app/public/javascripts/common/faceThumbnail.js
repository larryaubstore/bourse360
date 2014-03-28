define(function() {


  var _svg; 
  var _data;

  var Render = function (svg, data) {

    _svg = svg;
    _data = data;

    var circle = svg.selectAll("circle")
      .data(_data);


    circle.enter().append("circle")
      .attr("r", function(d) { return d.r; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("fill", function(d) { return "none"; })
      .attr("stroke", function(d) { return d.color; })
      .attr("stroke-width", function(d) { return d.r / 3.5; })

    .on("mouseover", function(d) {
      d3.select(this).transition()
        .duration(1000)
        .attr("stroke", "red");
    })

    .on("mouseout", function(d) {
      d3.select(this).transition()
        .duration(1000)
        .attr("stroke", "green");
    })

    .on("dblclick", function(d, i) {
  
      d.showDebug = true;
      window.renderers.popupDebug.Render(_svg, _data, i);
    });


    circle
      .attr("r", function(d) { return d.r; })
      .attr("cx", function(d) { return d.x + d.r; })
      .attr("cy", function(d) { return d.y + d.r; })
      .attr("fill", function(d) { return "none"; })
      .attr("stroke", function(d) { return d.color; })
      .attr("stroke-width", function(d) { return d.r / 3.5; });


  };


  var ShowDebug = function(svg, data) {


  }


  return {
    Render: Render
  };
});
