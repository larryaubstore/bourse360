//var require = requirejs.config({
//  baseUrl: "/"
//});

require(["d3", "userchart/viewchart", "config"], function(d3, viewchart, config) {
  console.log("running main");
  alert(config.performance);
});
