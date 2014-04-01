requirejs.config({paths: {d3: "http://d3js.org/d3.v3.min"}});

requirejs(["d3"], function(d3) {

  window.d3 = d3;
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

  requirejs([ "../common/faceThumbnail", 
         "../common/svg", 
         "../common/faceThumbnailDebug",
         "../common/renderers",
          ], function( faceThumbnail, svgMod, popupDebug, renderers) {

 

    var svg = svgMod.Render(990, 990); 

    renderers.faceThumbnail                    = faceThumbnail;
    renderers.faceThumbnailDebug               = popupDebug;
    renderers.faceThumbnail.Render(svg, data);

  });
});
