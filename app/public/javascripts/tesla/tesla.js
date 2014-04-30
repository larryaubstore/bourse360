requirejs.config(
{ 
  paths: {
    d3: "http://d3js.org/d3.v3.min",
    bootstrap: "/bootstrap/js/bootstrap.min"
  }
});


requirejs(["d3"], function(d3) {

  window.d3 = d3;

  //var links = {"source":2,"target":0,"value":8},{"source":3,"target":0,"value":10}

  var data = [
    { 
      level: 1,
      r: 45,
      x: 290,
      y: 290,
      color: "green",
      imagePath: "images/jack.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },
    { 
      level: 2,
      r: 110,
      x: 290,
      y: 290,
      color: "green",
      imagePath: "images/jack.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },
    { 
      level: 2,
      r: 110,
      x: 690,
      y: 290,
      color: "green",
      imagePath: "images/pauline.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },

    { 
      level: 3,
      r: 110,
      x: 690,
      y: 290,
      color: "green",
      imagePath: "images/pauline.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },
    { 
      level: 3,
      r: 110,
      x: 690,
      y: 290,
      color: "green",
      imagePath: "images/pauline.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },
    { 
      level: 3,
      r: 110,
      x: 690,
      y: 290,
      color: "green",
      imagePath: "images/pauline.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    }

  ];

  var links = [ 
    {"source":0,"target":1,"value":5},
    {"source":0,"target":2,"value":5},
    {"source":1,"target":3,"value":5},
    {"source":1,"target":4,"value":5},
    {"source":1,"target":5,"value":5},
  ];
  window.links = links;


  requirejs([ "../common/faceThumbnail", 
         "../common/svg", 
         "../common/faceThumbnailDebug",
         "../common/renderers",
         "../common/adminPanel"
          ], function( faceThumbnail, svgMod, popupDebug, renderers, adminPanel) {

 

    window.width  = 1200;
    window.height = 3000;

    window.levelCount = 3;


    var svg = svgMod.Render(window.width, window.height); 

    renderers.faceThumbnail                    = faceThumbnail;
    renderers.faceThumbnailDebug               = popupDebug;
    renderers.adminPanel                       = adminPanel;

    renderers.faceThumbnail.Render(svg, data);
    renderers.adminPanel.Render(svg, data);

  });
});
