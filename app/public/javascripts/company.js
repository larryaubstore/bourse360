define(["d3", "company/stockData", "company/rendering", "company/chartparams"  ], function( d3_mod, stockData, renderer, chartparams) {



  window.translateXhook = function (p, l, translate) {
    var diff = p[0] - l[0];
    if(translate[0] + diff < 0) {
      return true;
    } else {
      return true;
    }
  };


  renderer.render();


  // d3_mod, stockData, renderer, chartparams
  return {
    d3: d3,
    chartparams: chartparams
  };
  
});
