define([ "../common/faceThumbnail", 
         "../common/svg", 
         "d3",
         "../common/image",
         "../common/popupDebug"
          ], function( faceThumbnail, svgMod, ignore, imageMod, popupDebug) {

  var data = [
    { 
      r: 145,
      x: 290,
      y: 290,
      color: "green",
      imagePath: "images/jack.jpg",
      imageWidth: 253, 
      imageHeight: 349,
      showDebug: false
    },
    { 
      r: 145,
      x: 690,
      y: 290,
      color: "green",
      imagePath: "images/pauline.jpg",
      imageWidth: 253, 
      imageHeight: 349,
      showDebug: false
    }

  ];

  var svg = svgMod.Render(990, 990); 

  window.renderers = {};
  window.renderers.faceThumbnail = faceThumbnail;
  window.renderers.popupDebug    = popupDebug;
  window.renderers.imageMod      = imageMod;

  imageMod.Render(svg, data);
  faceThumbnail.Render(svg, data);
});
