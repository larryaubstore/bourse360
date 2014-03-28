define([ "../common/faceThumbnail", 
         "../common/svg", 
         "d3",
//         "../common/image",
         "../common/faceThumbnailDebug",
         "../common/renderers"
          ], function( faceThumbnail, svgMod, ignore, popupDebug, renderers) {

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

  renderers.faceThumbnail                    = faceThumbnail;
  renderers.faceThumbnailDebug               = popupDebug;
  renderers.faceThumbnail.Render(svg, data);
});
