// d3 -> undefined
define(["../common/faceThumbnail"  ], function( faceThumbnail) {

//  debugger;
//  var data = [
//    { 
//      r: 1,
//      x: 5,
//      y: 5,
//      color: "red"
//    }
//  ];


  var Render = function (svg, data) {
    svg.selectAll("circle")
      .data(data)
    .enter().append("circle")
      .attr("r", function(d) { return d.r; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .style("fill", function(d) { return d.color; });
  };


  return {
    Render: Render
  };
  
  //Render(svg, data);

  

});
