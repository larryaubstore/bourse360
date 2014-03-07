define([ "../common/faceThumbnail", 
         "../common/svg", 
         "../common/d3",
         "../common/image"  ], function( faceThumbnail, svgMod, d3Mod, imageMod) {

  var d3 = d3Mod;
  var data = [
    { 
      r: 80,
      x: 345,
      y: 245,
      color: "red",
      imagePath: "/images/jack.jpg",
      imageWidth: 253, 
      imageHeight: 349
    }
  ];

  var svg = svgMod.Render(500, 500); 
  imageMod.Render(svg, data);
  faceThumbnail.Render(svg, data);

});
