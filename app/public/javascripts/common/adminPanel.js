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

    CreateClass("div.admin.affix-top    { position:absolute !important; top: 10px !important; }");
    CreateClass("div.admin.affix        { position:fixed !important;  }");

    var dragstarted = function(d) {
      d3.event.sourceEvent.stopPropagation();
      d3.select(this).classed("dragging", true);
    }

    var dragged = function(d) {

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


    var adminPanel = d3.select("body").selectAll("div.class").data([{"x": "-250", "y": "0", "text": "Export", "callback": "Export"}]);


    var hideAdminPanel = function(scope) {
      var posPixel = d3.select(scope).style("right");
      if(posPixel.length > 2) {
        posPixel = posPixel.substr(0, posPixel.length - 2);
        if(parseInt(posPixel) <= 0) {
          d3.select(scope).transition()
            .style("right", function(d) {
              return "-250px";
            })
            .duration(750);
        }
      }
    };

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
      .on("mouseover", function () {

        d3.select(this).transition()
          .style("right", function(d) {
            return "0px";
          })
          .ease("elastic")
          .duration(750)
          .each("end", function() {
            //hideAdminPanel(this);
          });
          
      })
      .on("mouseout", function () {
        hideAdminPanel(this);
      })
      .call(drag)
      .call(function (selection) {
        //jQuery(selection).affix({ offset: { top: 100, bottom: 1000 }});
        jQuery(selection).affix({ offset: { top: 100 }});
      })


    outerdiv.append("div")
      .style("margin-right", "5px")
      .style("margin-top", "5px")
      .style("background-color", "#58FA82")

      .style("width", "75px")
      .style("border-radius", "5px")

      .style("text-align", "center")
      .style("font-weight", "bold")
      .style("float", "right")
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
