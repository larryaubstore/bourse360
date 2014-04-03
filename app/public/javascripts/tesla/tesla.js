requirejs.config(
{ 
  paths: {
    d3: "http://d3js.org/d3.v3.min",
    bootstrap: "/bootstrap/js/bootstrap.min"
  }
});


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
         "../common/adminPanel"
          ], function( faceThumbnail, svgMod, popupDebug, renderers, adminPanel) {

 

    var svg = svgMod.Render(1200, 3000); 

    renderers.faceThumbnail                    = faceThumbnail;
    renderers.faceThumbnailDebug               = popupDebug;
    renderers.adminPanel                       = adminPanel;

    renderers.faceThumbnail.Render(svg, data);
    renderers.adminPanel.Render(svg, data);

  });
});
