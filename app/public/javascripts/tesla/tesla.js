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
      imagePath: "/images/jack.jpg",
      imageWidth: 253, 
      imageHeight: 349,
      index: 1
    },
    { 
      r: 145,
      x: 490,
      y: 290,
      color: "green",
      imagePath: "/images/pauline.jpg",
      imageWidth: 253, 
      imageHeight: 349,
      index: 2
    }

  ];

  var svg = svgMod.Render(990, 990); 

  window.svg = svg;
  window.popupDebug = popupDebug;

  imageMod.Render(svg, data);
  faceThumbnail.Render(svg, data, popupDebug);

  //popup.Render(svg, data);

});
