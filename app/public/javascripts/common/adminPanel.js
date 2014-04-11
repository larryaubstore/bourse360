define([ "../common/renderers", "bootstrap" ], function(renderers, bootstrap) {


  var _svg; 
  var _data;
  var _renderers = renderers;

  var _callback = [];

  _callback["Export"] = function(callback) {
    alert("test");
    callback();
  }


  var CreateClass = function (content) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = content;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  var Render = function (svg, data) {

    CreateClass("div.admin.affix-top    { position:absolute !important; top: 100px !important; }");
    CreateClass("div.admin.affix-bottom { position:absolute !important; top: 1000px !important;  }");
    CreateClass("div.admin.affix        { position:fixed !important;  }");

    var dragstarted = function(d) {
      d3.event.sourceEvent.stopPropagation();
      d3.select(this).classed("dragging", true);
    }

    var dragged = function(d) {
      //d.x = d3.event.x;
      //d.y = d3.event.y;

//      d3.select(this)
//        .style("left", d.x + "px")
//        .style("top", d.y + "px");
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


    var adminPanel = d3.select("body").selectAll("div.class").data([{"x": "50", "y": "0", "text": "Export", "callback": "Export"}]);

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
      .style("right", function(d) {
        return d.x + "px";
      })
      .call(drag)
      .call(function (selection) {
        jQuery(selection).affix({ offset: { top: 100, bottom: 1000 }});
      })


    outerdiv.append("div")
      .style("margin-left", "5px")
      .style("margin-top", "5px")
      .style("background-color", "#58FA82")

      .style("width", "75px")
      .style("border-radius", "5px")

      .style("text-align", "center")
      .style("font-weight", "bold")
      .on("mousedown", function() {
        d3.select(this)
          .style("border-color", "red")
          .style("border-width", "2px")
          .style("height", "25px")
          .style("border-style", "solid");
      })
      .on("mouseup", function(d) {
        _callback[d.callback](function() {
          d3.select(this)
            .style("border-style", "none")
            .style("height", "22px");
        });
      })
      .on("mouseout", function() {
        d3.select(this)
          .style("border-style", "none")
          .style("height", "22px");
      })
      .text(function(d) {
        return d.text;
      });



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
