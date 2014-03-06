define([ "../common/faceThumbnail", "../common/svg", "../common/d3"  ], function( faceThumbnail, svgMod, d3Mod) {

  var d3 = d3Mod;
  var data = [
    { 
      r: 80,
      x: 345,
      y: 245,
      color: "red"
    }
  ];

  var svg = svgMod.Render(500, 500); 
  faceThumbnail.Render(svg, data);

});
