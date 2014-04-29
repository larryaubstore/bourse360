define(function() {

  var Render = function (width, height) {
    var container = d3.select("body");


    var svg = container
      .append("div")
      .style("width", "100%")
      .style("background-color", "#00FFBF")
      .append("svg");

    svg
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "white")
      .style("display", "block")
      .style("margin", "0 auto");
    return svg;
  };

  return {
    Render: Render
  };
});
