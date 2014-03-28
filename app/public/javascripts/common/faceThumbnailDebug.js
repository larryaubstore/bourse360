define(["../common/d3.tip", 
        "../common/d3.slider",
        "../common/renderers"], function (ignore, ignore, renderers) {

  var _svg;
  var _data;
  var _index;
  var _renderers = renderers;

  var Render = function (svg, data, index) {

      _svg =    svg;
      _data =   data;
      _index = index;

      var newArray = [];
      newArray.push(_data[index]);
      newArray[0].uniqueIndex = (new Date).getTime();

      var rects = d3.select("body").selectAll("div.debug")
        .data(newArray, function(d) {
          return d.uniqueIndex;
      });
      var showHideButtons = d3.select("body").selectAll("div.debug.showhidebutton")
        .data(newArray, function(d) {
          return d.uniqueIndex;
      });


      var button = showHideButtons.enter().append("div")
        .attr("class", "debug showhidebutton")
        .style("top", function(d) {
          return (d.y - 100) + "px";
        })
        .style("left", function(d) {
          return (d.x + 500) +  "px";
        })
        .style("background-color", "#3a87ad")
        .style("-webkit-border-radius", "3px")
        .style("-moz-border-radius", "3px")
        .style("position", "absolute")
        .style("padding", "10px")
        .style("border-radius", "3px")
        .style("display", function(d) {
          if(d.showDebug) {
            return "block";
          } else {
            return "none";
          }
        })
        .on("click", function(d, i) {
          _data[_index].showDebug = false;
          _renderers.faceThumbnailDebug.Render(_svg, _data, _index);
        })
        .text("Hide");

       showHideButtons.style("display", function(d) {
          if(d.showDebug) {
            return "block";
          } else {
            return "none";
          }
       });

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
          .on("slide", function(evt, value, index) {
            _data[_index].r = value;
            _renderers.faceThumbnail.Render(_svg, _data);
          }));

      rects.style("display", function(d) {
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
       
      rects.exit().remove();
      showHideButtons.exit().remove();
  }

  return {
    Render: Render
  };
});
