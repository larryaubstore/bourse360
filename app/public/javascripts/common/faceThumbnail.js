define(["../common/faceThumbnail/imageThumbnail", 
        "../common/renderers" ], function(imageThumbnail, renderers) {


  var _svg; 
  var _data;
  renderers.imageThumbnail = imageThumbnail;

  var _renderers = renderers;

  var _foci;

  var tick = function(e) {

    var k = 0.1 * e.alpha;

    var levelState = [];

    // Calculates count for each level.
    // For instance,
    // {
    //  ...,
    //  level:1
    // },
    // {
    //  ...,
    //  level:2
    // },
    // {
    //  ...,
    //  level:2
    // },
    // {
    //  ...,
    //  level:2
    // },
    // {
    //  ...,
    //  level:3
    // }
    // levelCount["1"] = 1;
    // levelCount["2"] = 2;
    // levelCount["3"] = 1;
//    _data.forEach(function(o, i) {
//      if( typeof(levelCount[o.level.toString()]) !== "undefined") {
//        levelCount[o.level.toString()] = 1;
//      } else {
//        levelCount[o.level.toString()] = levelCount[o.level.toString()] + 1;  
//      }
//    });
    


    var coefficient;
    _data.forEach(function(o, i) {
   
      //o.x +=  (_foci[o.level].x - (o.x + i*440)) * k;
      //o.x +=  (_foci[o.level].x * i - (o.x)) * k;

      o.y +=  (_foci[o.level-1].y * 1 - o.y) * k;

//      if(o.level != 0) {
//        if(i == 1) {
//          o.x +=  (_foci[o.level].x * 1.6 - (o.x)) * k;
//        }
//        else {
//          o.x +=  (_foci[o.level].x * 0.4  - (o.x)) * k;
//        }
//      } else {
//        o.x +=  (_foci[o.level].x * 1 - (o.x)) * k;
//      }


      if( typeof(levelState[o.level.toString()]) === "undefined" ) {
        levelState[o.level.toString()] = 0.5;

      } else {

        switch(levelState[o.level.toString()]) {

          case 0.5:
            levelState[o.level.toString()] = 1.5;
            break;
          case 1.5:
            levelState[o.level.toString()] = -0.5;
            break;
          case 0:
            levelState[o.level.toString()] = 2;
            break;
          case 2:
            levelState[o.level.toString()] = -0.5;
            break;
          case -0.5:
            levelState[o.level.toString()] = 2.5;
            break;
          case 2.5:
            levelState[o.level.toString()] = -1;
            break;

        }
     }


      //if(o.level != 1) {
        o.x +=  (_foci[o.level-1].x * levelState[o.level.toString()]  - (o.x)) * k;
      //} else {
      //  o.x +=  (_foci[o.level-1].x * 1 - (o.x)) * k;
      //}



      _data[i].y = o.y;
      _data[i].x = o.x;

    });

    var circle = _svg.selectAll("circle")
      .data(_data);

    circle
//      .attr("cx", function(d) { return (d.x * 8) - window.width / (2 / 6); })
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
          fociYpos = 100;
          break;
        case 1:
          fociYpos = 700;
          break;
        case 2:
          fociYpos = 1300;
          break;
      }
      
      console.log("X => " + fociXpos);
      console.log("Y => " + fociYpos);
      _foci.push({ x: fociXpos, y: fociYpos});
    }

    //_foci = [ {x: 600, y: 50},  {x: 0, y: 550},{x: 1400, y: 550}   ];

    _renderers.imageThumbnail.Render(svg, data);

    var circle = svg.selectAll("circle")
      .data(_data);

    var force = d3.layout.force()
      .nodes(_data)
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
