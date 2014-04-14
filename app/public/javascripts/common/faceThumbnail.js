define(["../common/faceThumbnail/imageThumbnail", 
        "../common/renderers" ], function(imageThumbnail, renderers) {


  var _svg; 
  var _data;
  renderers.imageThumbnail = imageThumbnail;

  var _renderers = renderers;


  var tick = function(e) {

    var k = 4 * 6 * e.alpha;
    _data.forEach(function(o, i) {
      _data[i].y += i & 1 ? k : -k;
      _data[i].x += i & 2 ? k : -k;
    });

    var circle = _svg.selectAll("circle")
      .data(_data);

    circle
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

    _renderers.imageThumbnail.Render(_svg, _data);
  };

  var Render = function (svg, data) {

    _svg = svg;
    _data = data;

    _renderers.imageThumbnail.Render(svg, data);

    var circle = svg.selectAll("circle")
      .data(_data);

    var force = d3.layout.force()
      .nodes(_data)
      .size([1200, 1000])
      .on("tick", tick)
      .start();

    circle.enter().append("circle")
      .attr("r", function(d) { return d.r; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("fill", function(d) { return "none"; })
      .attr("stroke", function(d) { return d.color; })
      .attr("stroke-width", function(d) { return d.r / 3.5; })

    .on("mouseover", function(d) {
      d3.select(this).transition()
        .duration(1000)
        .attr("stroke", "red");
    })

    .on("mouseout", function(d) {
      d3.select(this).transition()
        .duration(1000)
        .attr("stroke", "green");
    })

    .on("dblclick", function(d, i) {

      for(var index = 0; index < _data.length; index++) {
        _data.showDebug = false;
      }
  
      d.showDebug = true;
      _renderers.faceThumbnailDebug.Render(_svg, _data, i);
    })
    .call(force.drag);


    circle
      .attr("r", function(d) { return d.r; })
      .attr("cx", function(d) { return d.x + d.r; })
      .attr("cy", function(d) { return d.y + d.r; })
      .attr("fill", function(d) { return "none"; })
      .attr("stroke", function(d) { return d.color; })
      .attr("stroke-width", function(d) { return d.r / 3.5; });

  };


  var ShowDebug = function(svg, data) {


  }


  return {
    Render: Render
  };
});
