define([ "../common/renderers", "bootstrap" ], function(renderers, bootstrap) {


  var _svg; 
  var _data;
  var _renderers = renderers;


  var CreateClass = function (content) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = content;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  var Render = function (svg, data) {

    CreateClass("div.admin.affix-top    { position:absolute !important; top: 100px !important; }");
    //CreateClass("div.admin.affix-bottom { position:absolute !important; top: 600px !important;  }");
    CreateClass("div.admin.affix        { position:fixed !important; }");

    var dragstarted = function(d) {
      d3.event.sourceEvent.stopPropagation();
      d3.select(this).classed("dragging", true);
    }

    var dragged = function(d) {
      d.x = d3.event.x;
      //d.y = d3.event.y;

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


    var adminPanel = d3.select("body").selectAll("div.class").data([{"x": "200", "y": "0"}]);

    var outerdiv = adminPanel.enter().append("div")
      .attr("class", "admin")

      .attr("data-spy", "affix")
      .style("width", "300px")
      .style("height", "200px")
      .style("opacity", "0.75")
      .style("background-color", "black")
      .style("position", "absolute")
      .style("border-radius", "5px")
      .style("top", function(d) {
        return d.y + "px";
      })
      .style("left", function(d) {
        return d.x + "px";
      })
      .call(drag)
      .call(function (selection) {
        jQuery(selection).affix({ offset: 100 });
      })


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
