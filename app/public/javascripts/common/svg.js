define(function() {

  var Render = function (width, height) {
    var svg = d3.select("body").append("svg");

    svg
      .attr("width", width)
      .attr("height", height);
    return svg;
  };

  return {
    Render: Render
  };
});
