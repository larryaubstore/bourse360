define([ "../common/faceThumbnail", "../common/svg", "../common/d3"  ], function( faceThumbnail, svgMod, d3Mod) {

  var d3 = d3Mod;
  var data = [
    { 
      r: 10,
      x: 45,
      y: 45,
      color: "red"
    }
  ];

  var svg = svgMod.Render(500, 500); 
  faceThumbnail.Render(svg, data);

});
