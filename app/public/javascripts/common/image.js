define(function( ) {


  var Render = function (svg, data) {

    var defs = svg.selectAll("defs").data(data); 

    var def = defs.enter().append("defs");

    // Clip
    def.append("rect")
      .attr("id", function(d, i) {
        return "rect" + i;
      })
      .attr("x", function(d) {
        return d.x;
      })
      .attr("y", function(d) {
        return d.y;
      })
      .attr("width", function(d) {
        return d.r * 2;
      })
      .attr("height", function(d) {
        return d.r * 2;
      })
      .attr("rx", "120");


    def.append("clipPath")
        .attr("id", function(d, i) {
          return "clip" + i;
        })
        .append("use")
        .attr("xlink:href", function(d, i) {
          return "#rect" + i;
        });


    var images = svg.selectAll("image").data(data);

    images.enter().append("image")
      .attr("xlink:href", function(d) {
        return d.imagePath;
      })
      .attr("width", "250")
      .attr("height", "250")
      .attr("x", function(d) {
        return d.x + (d.r / 3.5) / 2;
      })
      .attr("y", function(d) {
        return d.y + (d.r / 3.5) / 2; 
      })
      .attr("clip-path", function(d, i) {
        return "url(#clip" + i + ")";
      });


  };


  return {
    Render: Render
  };
});
