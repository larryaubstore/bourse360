define(["../common/d3.tip", 
        "../common/d3.slider",
        "../common/renderers" ], function (ignore, ignore, renderers) {

  var _svg;
  var _data;
  var _index;
  var _renderers = renderers;

  var Render = function (svg, data, index) {

      _svg =    svg;
      _data =   data;
      _index = index;


      var newArray = [];
      if(_data.length > 0) {
        newArray.push({color: _data[index].color, 
                       fixed: _data[index].fixed,
                       imageHeight: _data[index].imageHeight,
                       imagePath: _data[index].imagePath,
                       imageWidth: _data[index].imageWidth,
                       index: (new Date).getTime(),
                       px: _data[index].px,
                       py: _data[index].py,
                       r: _data[index].r,
                       weight: _data[index].weight,
                       x: _data[index].x,
                       y: _data[index].y });
      }

      /* DATA */
      var rects = d3.select("body").selectAll("div.debug")
        .data(newArray, function(d) { return d.index; });

      var showHideButtons = d3.select("body").selectAll("div.dbgshowhidebutton")
        .data(newArray, function(d) { return d.index; });

      //rects.remove();
      //showHideButtons.remove();

      /* ENTER */
      var button = showHideButtons.enter().append("div")
        .attr("class", "dbgshowhidebutton")
        .style("top", function(d) {
          return (d.y - 100) + "px";
        })
        .style("left", function(d) {
          return "-150px";
        })
        .style("background-color", "#3a87ad")
        .style("-webkit-border-radius", "3px")
        .style("-moz-border-radius", "3px")
        .style("position", "absolute")
        .style("padding", "10px")
        .style("border-radius", "3px")
        .style("display", function(d) {
            return "block";
        })
        .on("click", function(d, i) {
          _renderers.faceThumbnailDebug.Render(_svg, [], _index);
        })
        .text("Hide");

        button.transition()
          .duration(750)
          .style("left", function(d) {
            return (d.x + 500) +  "px";
          });


      var container = rects.enter().append("div")
        .attr("class", "debug")
        .style("background-color", "gray")
        .style("position", "absolute")
        .style("padding", "20px")
        .style("display", function(d) {
          return "block";
        })
        .style("top", function(d) {
          return (d.y - 100) + "px";
        })
        .style("left", function(d) {
          return "-450px";
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

      container.transition()
        .duration(750)
        .style("left", function(d) {
          return d.x + "px";
        });


      /* UPDATE */
//      rects.style("display", function(d) {
//        if(d.showDebug) {
//          return "block";
//        } else {
//          return "none";
//        }
//      })
//      .style("top", function(d) {
//          return (d.y - 100) + "px";
//        })
//        .style("left", function(d) {
//          return d.x + "px";
//        });
//
//      showHideButtons.style("display", function(d) {
//        if(d.showDebug) {
//          return "block";
//        } else {
//          return "none";
//        }
//      })
     

      /* REMOVE */       
      rects.exit()
        .transition()
          .duration(750)
          .style("left", function(d) {
            return "-450px";  
          })
        .remove();

      showHideButtons.exit()
        .transition()
          .duration(750)
          .style("left", function(d) {
            return "-450px";  
          })
        .remove();
  }

  return {
    Render: Render
  };
});
