requirejs(["d3", "company/stockData"  ], function( d3_mod, stockData) {


  var data = stockData.data_values;

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x;
  var y;
  var xAxis;
  var yAxis;



  var initData = function (width, height) {
    x = d3.time.scale()
    .range([0, width]);
    
    y = d3.scale.linear()
    .range([height, 0]);

    xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");


    yAxis = d3.svg.axis()
       .scale(y)
       .ticks(15)
       .tickSize(-1)
       .orient("left");
  }; 

  initData(width, height); 


//  var x = d3.time.scale()
//      .range([0, width]);
//      
//  var y = d3.scale.linear()
//      .range([height, 0]);
//
//  var xAxis = d3.svg.axis()
//      .scale(x)
//      .orient("bottom");
//
//
//  var yAxis = d3.svg.axis()
//      .scale(y)
//      .orient("left");

  var area = d3.svg.area()
    .x(function(d) { 
      return x(d[0]); 
    })
    .y0(height)
    .y1(function(d) { 
      return y(d[1]); 
    });

  var areaZero = d3.svg.area()
    .x(function(d) { 
      return x(d[0]); 
    })
    .y0(height)
    .y1(function(d) { 
      return 0; 
    });


  var zoomed = function () {
    console.log("zoom ...");
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);
  };


  var graphData = { zoom: 1 };
  var pathSelection = [];

  var chartPath;

  var isAdded = false;
  var drawLine = function(params) {

    params.x = params.x + 50;

    var obj = [params];
    
    var myg = svgContainer.selectAll(".myg").data(obj);
    myg.enter()
      .append("g")
      .attr("class", "myg")
      .attr("opacity", function(d) {
          return d.opacity;
      });

    
    var myline = myg.selectAll(".myline").data(obj);  
    myline.enter().append("line")
          .attr("class", "myline")
          .attr("x1", function(d) {
            return d.x;
          })
          .attr("x2", function(d) {
            return d.x;
          })
          .attr("y1", 0)
          .attr("y2", 30)
          .attr("stroke-dasharray", "2,2,2,2")
          .attr("style", "stroke-width: 1; stroke: black;");

    myline
      .attr("x1", function(d) {
          return d.x;
      })
      .attr("x2", function(d) {
          return d.x;
      })
      .attr("y1", 0)
      .attr("y2", height + 20);
  };

  var svgContainer = d3.select("#chart").append("svg");
     svgContainer.attr("height", 0) 
      .attr("width", width + margin.left + margin.right)
     .on('mousemove', function () {
        var xMouse = d3.mouse(this)[0] - 50;
        var yMouse = d3.mouse(this)[1];

        drawLine({opacity: 1, x: xMouse, y: yMouse });
        
      })
      .transition()
        .duration(1000)
        .attr("height", height + margin.top + margin.bottom);

    svgContainer.on('click', function () {
      var xMouse = d3.mouse(this)[0] - 50;
      var yMouse = d3.mouse(this)[1];

      var xInterpolate = 1 - (width - xMouse) / (width  );
      var yInterpolate = 1 - (height - yMouse) / (height );

      var xIndex = Math.ceil(xInterpolate * data.length);
      var yIndex = Math.ceil(yInterpolate * data.length);

      var xConvert = x(data[xIndex][0]); 
      var yConvert = y(data[xIndex][1]);

      var obj = [{ x: xConvert, y: yConvert}];
      addCircle(obj, d3.mouse(this)[0], d3.mouse(this)[1]);
    });

 

    svg = d3.select("svg").append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var xMinMax = d3.extent(data, function(d) {
    return d[0];
  });

  var yMinMax = d3.extent(data, function(d) {
    return d[1];
  });


  x.domain(xMinMax); 
  y.domain(yMinMax);

  var zoom = d3.behavior.zoom()
      .x(x)
      .y(y)
      .scaleExtent([1, 10])
      .on("zoom", zoomed);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");


 
  var drawChart = function () {

     chartPath = svg.selectAll(".area").data([data]);


     chartPath.enter().append("path")
      .attr("class", "area")
      .attr("d", areaZero)
      .on('mousemove', function (d, i) {
        var epoch = (new Date).getTime();      
        var x = d3.mouse(this)[0];
        var y = d3.mouse(this)[1];
      })
      .on('mouseout', function (d, i) {
        setTimeout(function () {
        }, 600);
      })
      .transition()
        .duration(3000)
        .attr("d", area);
  };
 

  var addCircle = function(arg, mouseX, mouseY) {

      var circle = svgContainer
        .append("circle");


        circle.attr("cx", function (d) {
          return mouseX;
        })
        .attr("cy", function (d) {
          return mouseY;
        })
        .attr("r", 0)
        .attr("fill", "red")
        .transition()
          .duration(500)
          .attr("r", 5)
          .transition()
            .duration(500)
            .attr("cx", function (d) {
              return arg[0].x + 50;
            })
            .attr("cy", function (d) {
              return arg[0].y + 15;
            })
            .each("end", function() {
              d3.select(this).on("mouseover", function(d) {
                    d3.select(this).transition()
                      .duration(500)
                      .attr("fill", "green");
                  });

              d3.select(this).on("mouseout", function(d) {
                d3.select(this).transition()
                  .duration(500)
                  .attr("fill", "red");
              });
            });


  };

  d3.select("body").call(zoom);
  drawChart();
});
