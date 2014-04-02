define([ "../common/renderers" ], function(renderers) {


  var _svg; 
  var _data;
  var _renderers = renderers;

  var Render = function (svg, data) {

    var dragstarted = function(d) {
      d3.event.sourceEvent.stopPropagation();
      d3.select(this).classed("dragging", true);
    }

    var dragged = function(d) {
      d.x = d3.event.x;
      d.y = d3.event.y;

      d3.select(this)
        .style("left", d.x + "px")
        .style("top", d.y + "px");
    }

    var dragended = function(d) {
      d3.select(this).classed("dragging", false);
    }

    var drag = d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", dragstarted)
      .on("drag", dragged)
      .on("dragend", dragended);

    _svg = svg;
    _data = data;


    // <div data-spy="affix" data-offset-top="60" data-offset-bottom="200">
    var adminPanel = d3.select("body").selectAll("div.class").data([{"x": "100", "y": "100"}]);

    var outerdiv = adminPanel.enter().append("div")
      .attr("class", "admin")

      .attr("data-spy", "affix")
      .attr("data-offset-top", "60")
      .attr("data-offset-bottom", "200")

      .style("width", "300px")
      .style("height", "200px")
      .style("opacity", "0.75")
      .style("background-color", "black")
      .style("position", "absolute")
      .style("border-radius", "5px")
      .style("top", function(d) {
        return d.x + "px";
      })
      .style("left", function(d) {
        return d.y + "px";
      })
      .call(drag);

    outerdiv.append("div")
      .style("margin-left", "5px")
      .style("margin-top", "5px")
      .style("background-color", "#58FA82")
      .style("width", "60px")
      .style("height", "20px");


//    .on("mouseover", function(d) {
//    })
//    .on("mouseout", function(d) {
//    })
//    .on("dblclick", function(d, i) {
//    });

  };

  return {
    Render: Render
  };
});
