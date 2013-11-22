define(["d3", "company/stockData", "company/chartparams"  ], function( d3_mod, stockData, chartparams) {


  var drawLine = function(params, container) {

    params.x = params.x + 50;

    var obj = [params];
    var myg = container.selectAll(".myg").data(obj);
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
      .attr("y2", chartparams.height + 20);
  };

  var addCircle = function(chartparams, mouseX, mouseY, container, data) {
      var drag = d3.behavior.drag()
        .on("drag", function(d,i) {
          var arg = mouseToGraph(d3.mouse(this)[0], d3.mouse(this)[1]);


          var index = d3.select(this).data()[0].index;
          console.log("INDEX -> " + d3.select(this).data()[0].index);

          var element;
          for(var i = 0; i < chartparams.circles.length; i++) {

            element = chartparams.circles[i];
            if(element.index === index) {
              element.index = arg[0].index;
            } 
          } 
        

          var svgContainer = d3.select("#chart");
          var circle = svgContainer.selectAll("circle")
              .data(chartparams.circles, function(d) { return d.key; });

          circle.attr("cx", function (d) {
            return chartparams.x(data.stock[d.index][0]) + 50; 
          })
          .attr("cy", function (d) {
            return chartparams.y(data.stock[d.index][1]) + 15; 
          });
        });


      var circle = container.selectAll("circle")
        .data(chartparams.circles, function(d) { return d.index; });


        circle.enter().append("circle")
          .attr("cx", function (d) {
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
                return chartparams.x(data.stock[d.index][0]) + 50; 
              })
              .attr("cy", function (d) {
                return chartparams.y(data.stock[d.index][1]) + 15; 
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
                d3.select(this).call(drag);
            });
  };


  var drawChart = function (container, data, chartparams) {
    
      var gContainer = container.selectAll("#chartwrapper").data([data.stock]);
  
      gContainer = gContainer.enter().append("g")
        .attr("id", "chartwrapper");


      var chartPath = gContainer.selectAll(".area").data([data.stock]);


       chartPath.enter().append("path")
        .attr("class", "area")
        .attr("d", chartparams.areaZero)
        .on('mousemove', function (d, i) {
          var epoch = (new Date).getTime();      
          var x = d3.mouse(this)[0];
          var y = d3.mouse(this)[1];
        })
        .on('mouseout', function (d, i) {

        })
        .transition()
          .duration(2000)
          .attr("d", chartparams.area)
          .each("end", function () {
            console.log("update ...");

            chartPath
             .attr("d", chartparams.area);
          });
  };


  var drawContainer = function (container, data, chartparams) {

    container.attr("height", 0) 
      .attr("width", chartparams.width + chartparams.margin.left + chartparams.margin.right)
      .on('mousemove', function () {
        var xMouse = d3.mouse(this)[0] - 50;
        var yMouse = d3.mouse(this)[1];

        drawLine({opacity: 1, x: xMouse, y: yMouse }, container);
        
      })
      .transition()
        .duration(1000)
        .attr("height", chartparams.height + chartparams.margin.top + chartparams.margin.bottom);

    container.on('click', function () {

      console.log("click ...");
      var xMouse = d3.mouse(this)[0] - 50;
      var yMouse = d3.mouse(this)[1];

      var xInterpolate = 1 - (chartparams.width - xMouse) / (chartparams.width  );
      var yInterpolate = 1 - (chartparams.height - yMouse) / (chartparams.height );

      var xIndex = Math.floor(xInterpolate * data.stock.length);
      var yIndex = Math.ceil(yInterpolate * data.stock.length);

      var xConvert = chartparams.x(data.stock[xIndex][0]); 
      var yConvert = chartparams.y(data.stock[xIndex][1]);
      var obj = { key: new Date().getTime(), index: xIndex};

     
      chartparams.circles.push(obj);
      addCircle(chartparams, d3.mouse(this)[0], d3.mouse(this)[1], container, data);
    });
  };

  var drawXAxis = function (container, chartparams) {

    container.append("rect")
      .attr("width", chartparams.width + 100)
      .attr("height", "50px")
      .attr("fill", "white")
      .attr("transform", "translate(0," + chartparams.height + ")");

    container.append("g")
        .attr("class", "x axis")
        .attr("opacity", "1")
        .attr("transform", "translate(0," + chartparams.height + ")")
        .call(chartparams.xAxis);
  };

  var drawYAxis = function (container, chartparams) {

    container.append("rect")
      .attr("width", 50)
      .attr("height", chartparams.height + 100)
      .attr("fill", "white")
      .attr("transform", "translate(-50,-50)")

    container.append("g")
        .attr("class", "y axis")
        .call(chartparams.yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");
  };

  var mouseToGraph = function (xPos, yPos) {
      var xMouse = xPos - 50;
      var yMouse = yPos;

      var xInterpolate = 1 - (chartparams.width - xMouse) / (chartparams.width  );
      var yInterpolate = 1 - (chartparams.height - yMouse) / (chartparams.height );

      var xIndex = Math.floor(xInterpolate * stockData.data_values.length);
      var yIndex = Math.ceil(yInterpolate * stockData.data_values.length);

      var xConvert = chartparams.x(stockData.data_values[xIndex][0]); 
      var yConvert = chartparams.y(stockData.data_values[xIndex][1]);

      var obj = [{ x: xConvert, y: yConvert, index: xIndex}];

      return obj;
  };


  return {
    drawLine: drawLine,
    drawChart: drawChart,
    drawContainer: drawContainer,
    drawXAxis: drawXAxis,
    drawYAxis: drawYAxis,
    addCircle: addCircle,
    mouseToGraph: mouseToGraph
  };
});
