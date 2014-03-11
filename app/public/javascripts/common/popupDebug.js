define(["../common/d3.tip"], function (d3tip) {


  var Render = function (svg, data) {
    var tip = d3.tip()
      .attr('style', 'line-height: 1;' +
                     'font-weight: bold;' +
                     'padding: 12px;' + 
                     'background: rgba(0, 0, 0, 0.8);' +
                     'color: #fff;' +
                     'border-radius: 2px;')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Frequency:</strong> <span style='color:red'>" + "</span>";
      });

    svg.call(tip);
    tip.show();
  };

  return {
    Render: Render
  };
});
