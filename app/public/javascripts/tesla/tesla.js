requirejs.config(
{ 
  paths: {
    d3: "http://d3js.org/d3.v3.min",
    bootstrap: "/bootstrap/js/bootstrap.min",
    jsoneditor: "/javascripts/jsoneditor/jsoneditor-min"
  }
});


requirejs(["d3", "jsoneditor"], function(d3, jsoneditor) {

  window.d3 = d3;
  var container = document.getElementById('jsoneditor');
  var editor = new jsoneditor.JSONEditor(container);

  editor.setMode("text");
  //document.getElementById('setJSON').onclick = function () {
//    var json = {
//      'array': [1, 2, 3],
//      'boolean': true,
//      'null': null,
//      'number': 123,
//      'object': {'a': 'b', 'c': 'd'},
//      'string': 'Hello World'
//    };
//    editor.set(json);
  //};
//
//  document.getElementById('getJSON').onclick = function () {
//    var json = editor.get();
//    alert(JSON.stringify(json, null, 2));
//  }; 
  //var links = {"source":2,"target":0,"value":8},{"source":3,"target":0,"value":10}

  window.width  = 1200;
  window.height = 3000;

  var data = [
    { 
      level: 1,
      r: 45,
      x: window.width / 2,
      y: -300,
      color: "green",
      imagePath: "images/jack.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },
    { 
      level: 2,
      r: 110,
      x: window.width / 2,
      y: -300,
      color: "green",
      imagePath: "images/jack.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },
    { 
      level: 2,
      r: 110,
      x: window.width / 2,
      y: -300,
      color: "green",
      imagePath: "images/pauline.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },

    { 
      level: 3,
      r: 110,
      x: window.width / 2,
      y: -300,
      color: "green",
      imagePath: "images/pauline.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },
    { 
      level: 3,
      r: 110,
      x: window.width / 2,
      y: -300,
      color: "green",
      imagePath: "images/pauline.jpg",
      imageWidth: 253, 
      imageHeight: 349,
    },
    { 
      level: 3,
      r: 110,
      x: window.width / 2,
      y: -300,
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

  editor.set(data);

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
