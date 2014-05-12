requirejs.config(
{ 
  paths: {
    d3: "http://d3js.org/d3.v3.min",
    bootstrap: "/bootstrap/js/bootstrap.min",
    jsoneditor: "/javascripts/jsoneditor/jsoneditor"
  }
});



//var require = requirejs.config({
//  baseUrl: "/"
//});
requirejs([ "d3" ], function( d3 ) {

  // Returns a flattened hierarchy containing all leaf nodes under the root.
  function classes(root) {
    var classes = [];

    function recurse(name, node) {
      if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
      else classes.push({packageName: name, className: node.name, value: node.size});
    }

    recurse(null, root);
    return {children: classes};
  }

  var data = 
  {
     "name": "politique",
     "children": [
      {
       "name": "parti québécois",
       "children": [
        {"name": "Parti québécois", "size": 2938},
        {"name": "René Lévesque", "size": 2812},
        {"name": "Souveraineté", "size": 1812},
        {"name": "Charte", "size": 1812}
       ]
      },
      {
       "name": "parti libéral",
       "children": [
        {"name": "Parti libéral", "size": 1534},
        {"name": "Jean Charest", "size": 1731},
        {"name": "Commission Charbonneau", "size": 5840}
       ]
      },
      {
       "name": "union national",
       "children": [
        {"name": "Duplessis", "size": 1074},
        {"name": "Caisse électorale", "size": 5000}
       ]
      },
      {
       "name": "québec solidaire",
       "children": [
        {"name": "Québec solidaire", "size": 3074},
        {"name": "Vote proportionnel", "size": 5000}
       ]
      }

     ]
  };



  var diameter = 960 / 2,
      format = d3.format(",d"),
      color = d3.scale.category20();

  var bubble = d3.layout.pack()
      .sort(null)
      .size([diameter, diameter])
      .padding(1.5);


  var div = d3.select("body").append("div")
    .style("width", "100%");

  var svg = div.append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .style("display", "block")
      .style("float", "right")
      .attr("class", "bubble");

  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(data))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.packageName); });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); });


  d3.select(self.frameElement).style("height", diameter + "px");


});
