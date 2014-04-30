define(["../common/faceThumbnail/imageThumbnail", 
        "../common/renderers" ], function(imageThumbnail, renderers) {


  var _svg; 
  var _data;
  renderers.imageThumbnail = imageThumbnail;

  var _renderers = renderers;

  var _foci;

  var tick = function(e) {
//    var k = 0.1 * e.alpha;
    var k = 0.1 * e.alpha;
    var levelState = [];


    var coefficient;
    _data.forEach(function(o, i) {
   
      o.y +=  (_foci[o.level-1].y * 1 - o.y) * k;
      if( typeof(levelState[o.level.toString()]) === "undefined" ) {
        levelState[o.level.toString()] = 1;
      } else {
        switch(levelState[o.level.toString()]) {
          case 1:
            levelState[o.level.toString()] = 0;
            break;
          case 0:
            levelState[o.level.toString()] = 2;
            break;
          case 2:
            levelState[o.level.toString()] = -1;
            break;
          case -1:
            levelState[o.level.toString()] = 3;
            break;
          case 3:
            levelState[o.level.toString()] = -2;
            break;
          case -2:
            levelState[o.level.toString()] = 4;
            break;
          case 4:
            levelState[o.level.toString()] = -3;
            break;
        }
     }

     o.x +=  (_foci[o.level-1].x * levelState[o.level.toString()]  - (o.x)) * k;

     _data[i].y = o.y;
     _data[i].x = o.x;


    });

    var link = _svg.selectAll(".link");
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; }); 

    var circle = _svg.selectAll("circle")
      .data(_data);

    circle
      .attr("cx", function(d) { return d.x ; })
      .attr("cy", function(d) { return d.y; });


    _renderers.imageThumbnail.Render(_svg, _data);
  };

  var Render = function (svg, data) {

    _svg = svg;
    _data = data;

    _foci = [];

    var fociXpos;
    var fociYpos;

    for(var i = 0; i < window.levelCount; i++) {
      fociXpos = window.width / 2;
//      fociYpos = -(window.height / (i+1)) + 450;
      //fociYpos = -(window.height / (i+1)) * 1.5 + 850;
      //fociYpos = -(window.height / (i+1)) + 2500;

      switch(i) {

        case 0:
          //fociYpos = 100;
          fociYpos = 100 - 1300;
          break;
        case 1:
          fociYpos = 700 - 1300;
          break;
        case 2:
          fociYpos = 1300 - 1300;
          break;
      }
      
      _foci.push({ x: fociXpos, y: fociYpos});
    }

    //_foci = [ {x: 600, y: 50},  {x: 0, y: 550},{x: 1400, y: 550}   ];
    var link = svg.selectAll(".link")
      .data(window.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke", "#999")
      .style("stroke-opacity", ".6")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

    _renderers.imageThumbnail.Render(svg, data);

    var circle = svg.selectAll("circle")
      .data(_data);

    var force = d3.layout.force()
      .nodes(_data)
      .links(window.links)
//      .linkDistance(460)
      .linkDistance(1360)
      .linkStrength(0)
      .alpha(0.005)
      .size([window.width, window.height])
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
      _renderers.faceThumbnailDebug.Render(_svg, _data, i);
    })
    .call(force.drag);


    circle
      .attr("r", function(d) { return d.r; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
//      .attr("cx", function(d) { return d.x + d.r; })
//      .attr("cy", function(d) { return d.y + d.r; })
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
