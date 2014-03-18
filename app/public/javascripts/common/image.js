define(function( ) {


  var Render = function (svg, data) {

//    var rect = svg.append("rect")
//      .attr("rx", 30)
//      .attr("width", 600)
//      .attr("height", 500);
//
//    rect.selectAll("image")
//      .data(data)
//    .enter().append("image")
//      .attr("xlink:href", function(d) { return d.imagePath; })
//      .attr("width", function(d) { return d.imageWidth; })
//      .attr("height", function(d) { return d.imageHeight; });
//      .attr("style", "-webkit-border-radius:50%;border-radius:50%;");



//  <defs>
//    <rect id="rect" x="25%" y="25%" width="50%" height="50%" rx="15"/>
//    <clipPath id="clip">
//      <use xlink:href="#rect"/>
//    </clipPath>
//  </defs>
//
//  <use xlink:href="#rect" stroke-width="2" stroke="black"/>
//  <image xlink:href="boston.jpg" width="100%" height="100%" clip-path="url(#clip)"/>


    var defs = svg.selectAll("defs").data(data); 

    var def = defs.enter().append("rect")
      .attr("id", function(d) {
        return "rect" + d.index;
      })
      .attr("x", function(d) {
        return d.x;
      })
      .attr("y", function(d) {
        return d.y;
      })
      .attr("width", function(d) {
        return d.imageWidth; 
      })
      .attr("height", function(d) {
        return d.imageHeight;
      })
      .attr("rx", "120")
      .append("clipPath")
        .attr("id", function(d) {
          return "clip" + d.index;
        })
        .append("use")
        .attr("xlink:href", function(d) {
          return "#rect" + d.index;
        });


    def.attr("xlink:href", function(d) {
      return "#rect" + d.index;
    });


    var images = svg.selectAll("image").data(data);

    images.enter().append("image")
      .attr("xlink:href", "images/jack.jpg")
      .attr("width", "250")
      .attr("height", "250")

      .attr("x", function(d) {
        return d.x;
      })
      .attr("y", function(d) {
        return d.y; 
      })
      .attr("clip-path", function(d) {
        return "url(#clip" + d.index + ")";
      });


  };


  return {
    Render: Render
  };
});
