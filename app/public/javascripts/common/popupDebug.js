define(["../common/d3.tip", "../common/d3.slider"], function (ignore, ignore) {

  var Render = function (svg, data, circleRenderer, index) {


      window.circleRenderer = circleRenderer;
      window.svg = svg;
      window.data = data;
      window.index = index;

      var newArray = [];
      newArray.push(data[index]);

      var rects = d3.select("body").selectAll("div.debug").data(newArray);
      var container = rects.enter().append("div")
        .attr("class", "debug")
        .style("background-color", "gray")
        .style("position", "absolute")
        .style("padding", "20px")
        .style("display", function(d) {
          if(d.showDebug) {
            return "block";
          } else {
            return "none";
          }
        })
        .style("top", function(d) {
          return (d.y - 100) + "px";
        })
        .style("left", function(d) {
          return d.x + "px";
        });

      container.append("div")
        .style("float", "left")
        .style("width", "100px")
        .html("Radius");

      container.append("div")
        .style("float", "left")
        .style("background-color", "white")
        .call(d3.slider()
          .axis(true)
          .min(0)
          .margin(100)
          .max( function(d) {
            return d.r * 2;
          })
          .step(5)
          .value( function(d) {
            return d.r;
          })
          .on("slide", function(evt, value, selection) {
            //window.data[selection.__data__.index].r = value;
            window.data[window.index].r = value;
            window.circleRenderer.Render(window.svg, window.data, window.popupDebug);
          }));


      rects.style("top", function(d) {
          return (d.y - 100) + "px";
        })
        .style("left", function(d) {
          return d.x + "px";
        });
       

      rects.exit().remove();
  }

  return {
    Render: Render
  };
});
