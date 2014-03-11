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


    var defs = svg.append("defs");

    defs.append("rect")
      .attr("id", "rect")
      .attr("x", "165")
      .attr("y", "165")
      .attr("width", "50%")
      .attr("height", "50%")
      .attr("rx", "120")

    clippath = svg.append("clipPath")
      .attr("id", "clip");


    clippath.append("use")
      .attr("xlink:href", "#rect");


    svg.append("use")
      .attr("xlink:href", "#rect")

    svg.append("image")
      .attr("xlink:href", "images/jack.jpg")
      .attr("width", "50%")
      .attr("height", "50%")

      .attr("x", "150")
      .attr("y", "150")

      .attr("clip-path", "url(#clip)")


  };


  return {
    Render: Render
  };
});
