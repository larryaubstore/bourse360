define([ "../common/renderers", "jsoneditor" ], function(renderers, jsoneditor) {

  var _svg;
  var _data;
  var _renderers = renderers;

  var _onMouseOver = false;

  var Render = function (svg, data) {
    _svg = svg;
    _data = data;

    var container = document.getElementById('jsoneditor');
    var editor = new jsoneditor.JSONEditor(container);
    editor.setMode("text");
    editor.set(_data);

    var jsonEditorD3 = d3.select("#jsoneditor").data([{x: -450, y:250}]);
    var hideJsonEditor = function(scope) {
      var posPixel = d3.select(scope).style("right");
      if(posPixel.length > 2) {
        posPixel = posPixel.substr(0, posPixel.length - 2);
        if(parseInt(posPixel) <= 0) {
          d3.select(scope).transition()
            .style("right", function(d) {
              return "-450px";
            })
            .duration(750);
        }
      }
    }



    var drag = d3.behavior.drag()
      .on("drag", function(d,i) {

          console.log("drag ...");
          d.x -= d3.event.dx;
          d.y += d3.event.dy;

          //_renderers.jsonEditorDrag.Render(_svg, _data);

          d3.select(this)
            .style("right", function(d) {
              return d.x + "px";
            })
            .style("top", function(d) {
              return d.y + "px";
            });

      });

    jsonEditorD3
      .style("right", function(d) {
        return d.x + "px";
      })
      .style("top", function(d) {
        return d.y + "px";
      })
      .style("position", function(d) {
        return "fixed";
      })
      .style("width", function(d) {
        return "500px";
      })
      .style("height", function(d) {
        return "500px";
      })
      .on("mouseout", function () {

        _onMouseOver = false;
        var scope = this;
        setTimeout(function() {
          if(_onMouseOver == false) {
            hideJsonEditor(scope);
          }
        }, 2500);
      })
      .on("mouseover", function () {
        _onMouseOver = true;
        d3.select(this).transition()
          .style("right", function(d) {
            return "0px";
          })
          .ease("elastic")
          .duration(1500)
          .each("end", function() {
            //hideAdminPanel(this);
          });
      });




//      .call(drag);
//      .call(function (selection) {
//
//        jQuery(selection).affix({ offset: { top: 600 }});
//      });

  }


  return {
    Render: Render
  };

});
