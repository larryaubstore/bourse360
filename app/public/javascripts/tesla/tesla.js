requirejs.config(
{ 
  paths: {
    d3: "http://d3js.org/d3.v3.min",
    bootstrap: "/bootstrap/js/bootstrap.min",
    jsoneditor: "/javascripts/jsoneditor/jsoneditor"
  }
});


require(["d3" ], function(d3) {

  window.d3 = d3;

  window.width  = 1100;
  window.height = 3000;

  var data = [
    { 
      level: 1,
      r: 45,
      x: window.width / 2,
      y: 300,
      color: "green",
      imagePath: "images/logo_pq.gif",
      imageWidth: 100, 
      imageHeight: 100,
    },
    { 
      level: 2,
      r: 110,
      x: window.width / 2,
      y: 300,
      color: "green",
      imagePath: "images/jack.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },
    { 
      level: 2,
      r: 110,
      x: window.width / 2,
      y: 300,
      color: "green",
      imagePath: "images/pauline.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },

    { 
      level: 3,
      r: 110,
      x: window.width / 2,
      y: 300,
      color: "green",
      imagePath: "images/pauline.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },
    { 
      level: 3,
      r: 110,
      x: window.width / 2,
      y: 300,
      color: "green",
      imagePath: "images/pauline.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },
    { 
      level: 3,
      r: 110,
      x: window.width / 2,
      y: 300,
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

 


    window.levelCount = 3;


    var svg = svgMod.Render(window.width, window.height); 

    renderers.faceThumbnail                    = faceThumbnail;
    renderers.faceThumbnailDebug               = popupDebug;
    renderers.adminPanel                       = adminPanel;

    renderers.faceThumbnail.Render(svg, data);
    renderers.adminPanel.Render(svg, data);

  });
});
