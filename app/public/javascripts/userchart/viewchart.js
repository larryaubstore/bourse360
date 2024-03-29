//alert("test");
//alert(config.performance);
//

//require( ['config', 'd3' ], function( config, d3 ) {
  //alert(config.performance);
  //alert("d3 => " + d3);
define(["d3", "config"  ], function(d3require, config ) {
  var t = 1297110663, // start time (seconds since epoch)
      v = 70, // start value (subscribers)
      //data = d3.range(33).map(next); // starting dataset
      //
      //
      data = config.performance;
  
  //debugger;

  function next() {
    return {
      time: ++t,
      value: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
    };
  }


  data =  [ {period: 5, name: "may", perf: 3.5}, 
            {period: 5, name: "may", perf: 1}, 
            {period: 6, name: "june", perf: 2}, 
            {period: 6, name: "june", perf: 0.3},
            {period: 6, name: "june", perf: 2}, 
            {period: 7, name: "july", perf: 0.5}, 
            {period: 7, name: "july", perf: 10}, 
            {period: 8, name: "august", perf: -12.5} ];

  var dataNested=d3.nest()
    .key(function(d) {return d.period;})
    .sortKeys(d3.ascending)
    .entries(data);

  var yAxisData = [0, 2.5, 5.0, 7.5, 10, 12.5, 15];

  var w = 60,
      h = 280 * 2;
  
  var x = d3.scale.linear()
      .domain([0, 1])
      .range([0, w]);
  
  var y = d3.scale.linear()
     .domain([0, 15])
     .range([0, 180]);

  var constY = -5; 
  var width = w * data.length - 1 + 100;

  var divChart = d3.select("#chart")
    .attr("width", w * data.length - 1 + 100)
    .attr("style", "margin: 0 auto;width:" + width + "px");

  var chart = d3.select("#chart").append("svg")
    .attr("class", "chart")
    .attr("width", w * data.length - 1 + 100)
    .attr("style", "margin-top:20px")
    .attr("height", h);


  var bars = chart.selectAll("rect")
      .data(data);

    bars.enter().append("rect")
    .attr("class", function(d) {
      if(y(d.perf) >= 0) {
        return "chartpositive";
      } else {
        return "chartnegative";
      }
    })
    .attr("x", function(d, i) {
      return x(i) +  50;
     })
    .attr("y", function(d) {
      
      if(y(d.perf) >= 0) {
        return (h/2 - y(d.perf) + constY) ; 
      } else {
        return (h/2  + constY) ; 
      }
    })
    .attr("transform", function(d) {
      if(y(d.perf) >= 0) {
        return "translate(0," + Math.abs(y(d.perf)) + ")";
      } else {
        return "translate(0,0)";
      }
    })
    .attr("width", function(d) {
      return w;
    })
    .attr("height", function(d) { 
      return 0;
    })
    .on("mouseover", function(d){
      d3.select(this).transition().duration(750)
        .style("fill", "#FFD700");
    })
    .on("mouseout", function(d){
      if(y(d.perf) >= 0) {
        d3.select(this).transition().duration(750)
          .style("fill", "green");
      } else {
        d3.select(this).transition().duration(750)
          .style("fill", "red");
      }
    })
    .transition()
      .duration(750)
      .attr("height", function(d) {
        return Math.abs(y(d.perf));
      })
      .attr("transform", function(d) {
        return "translate(0,0)"
      });


  chart.selectAll("text")
    .data(yAxisData)
    .enter().append("text")
    .attr("dy", ".32em")
    .attr("x", "0")
    .attr("y", function(d) { 
      return h/2 - y(d) + constY; 
    })
    .text(function(d) { 
      return d; 
    });

  chart.selectAll("line")
    .data(yAxisData)
    .enter().append("line")
    .attr("x1", 50)
    .attr("x2", w * data.length - 1 + 50)
    .attr("y1", function(d) {
      return h/2 - y(d) + constY;
    })
    .attr("y2", function(d) {
      return h/2 - y(d) + constY;
    })
    .style("stroke", "#000");

  chart.append("line")
     .attr("x1", 50)
     .attr("x2", w * data.length - 1 + 50)
     .attr("y1", h/2 + constY)
     .attr("y2", h/2 + constY)
     .style("stroke", "#000");

  function redraw() {
    // Update…
    chart.selectAll("rect")
        .data(data)
        .transition()
        .duration(1000)
        .attr("y", function(d) { return h - y(d) - .5; })
        .attr("height", function(d) { return y(d); });
  }

//  return {
//    color: "black",
//    size: "unisize"
//  }


});
    
//  return {
//    test: "test"
//  };


  //define('data', function () {
  //}); 

//  setInterval(function() {
//    data.shift();
//    data.push(next());
//    redraw();
//  }, 1500);


//});
