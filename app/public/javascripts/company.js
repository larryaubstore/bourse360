//var require = requirejs.config({
//  baseUrl: "/"
//});
requirejs(["d3", "company/stockData"  ], function( d3_mod, stockData) {


  var data = stockData.data_values;


  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;


  var x = d3.time.scale()
      .range([0, width]);
      
  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");


  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

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

  var graphData = { zoom: 1 };
  var pathSelection = [];

  var isAdded = false;

  var svgContainer = d3.select("#chart").append("svg");


     svgContainer.attr("height", 0) 
      .attr("width", width + margin.left + margin.right)
      //.attr("style", "width:100%;height:100%;display:block")
      //.attr("style", "margin:0 auto;width:960px;display:block")
     .on('mouseover', function () {
      })
      .transition()
        .duration(1000)
        .attr("height", height + margin.top + margin.bottom);

    svgContainer.on('mousemove', function () {

      //console.log("test");
      var epoch = (new Date).getTime();      
      var xMouse = d3.mouse(this)[0];
      var yMouse = d3.mouse(this)[1];


      //var xInterpolate = (width - xMouse) / width  * (xMinMax[1] - xMinMax[0]) + xMinMax[0];
      //var yInterpolate = (height - yMouse) / height  * (yMinMax[1] - yMinMax[0]) + yMinMax[0];

      var xInterpolate = 1 - (width - xMouse) / width;
      var yInterpolate = 1 - (height - yMouse) / height;


      var xIndex = Math.ceil(xInterpolate * data.length);
      var yIndex = Math.ceil(yInterpolate * data.length);

      

      var xConvert = x(data[xIndex][0]); 
      var yConvert = y(data[xIndex][1]);



      //xConvert = xMouse;
      //yConvert = yMouse;

      //var obj = {index: epoch, x: x, y: y};
      var obj = [{ x: xConvert, y: yConvert}];

      //pathSelection = obj;

      //pathSelection.push(obj);
      //addCircle(pathSelection);
      //
      //
      
      //if( x > 20 && x < width + 20) {
        addCircle(obj);
      //} else {
      //  addCircle([]);
      //}


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
     svg.datum(data)
      .append("path")
      .attr("class", "area")
      .attr("d", areaZero)
      .on('mousemove', function (d, i) {
        var epoch = (new Date).getTime();      
        var x = d3.mouse(this)[0];
        var y = d3.mouse(this)[1];

//        var obj = {index: epoch, x: x, y: y};
//
//        addCircle(obj);

        //pathSelection.push(obj);
        //addCircle(pathSelection);
      })
      .on('mouseout', function (d, i) {
        setTimeout(function () {
          //pathSelection.pop();
          //addCircle(pathSelection);
        }, 600);
      })
      .transition()
        .duration(3000)
        .attr("d", area);
  };
 

  var addCircle = function(arg) {

      var circle = svgContainer.selectAll("circle").data(arg);

      circle.enter()
        .append("circle")
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        })
        .attr("r", 0)
        .attr("fill", "red")
        .transition()
          .duration(500)
          .attr("r", 5);


      circle
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        });

      circle.exit()
        .transition()
          .duration(500)
          .attr("r", 0)
        .remove();
  };


  drawChart();

});
