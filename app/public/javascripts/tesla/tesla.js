define([ "../common/faceThumbnail", 
         "../common/svg", 
         "d3",
         "../common/image",
         "../common/popupDebug"
          ], function( faceThumbnail, svgMod, ignore, imageMod, popup) {

  var data = [
    { 
      r: 145,
      x: 290,
      y: 290,
      color: "green",
      imagePath: "/images/jack.jpg",
      imageWidth: 253, 
      imageHeight: 349
    }
  ];

  window.zoom = d3.behavior.zoom();
  var svg = svgMod.Render(500, 500); 
  imageMod.Render(svg, data);
  faceThumbnail.Render(svg, data);

  popup.Render(svg, data);

});
