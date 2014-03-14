define(["../common/d3.tip", "../common/d3.slider"], function (ignore, ignore) {

  var Render = function (svg, data, circleRenderer) {
    if(!window.tipCircle) {
      var tipCircle = d3.tip()
        .attr('style', 'line-height: 1;' +
                       'font-weight: bold;' +
                       'padding: 21px;' + 
                       'background: rgba(0, 0, 0, 0.5);' +
                       'color: #fff;' +
                       'border-radius: 2px;' +
                       'width:300px;' + 
                       'position:absolute')
        .offset([-40, 0])
        .attr("id", "popupDebug")
        .html(function(d) {
          return "<div style='padding-bottom:10px'><strong>Frequency:</strong></div> <span style='color:red'>" + "</span>" +
          "<div class='slider'></div><div style='width:100px;height:50px;background-color:red;position:relative;z-index:5;margin-top:10px;' onClick='window.hidePopup();'>Close</div>";
        });


      window.hidePopup = function () {
        document.getElementById("popupDebug").style.display = 'none';
      };

      window.showPopup = function () {
        document.getElementById("popupDebug").style.display = 'block';
      };

      window.tipCircle = tipCircle;
      svg.call(tipCircle);
      tipCircle.show();


      window.circleRenderer = circleRenderer; 
      d3.select('.slider').call(d3.slider().axis(true).min(0).max(data[0].r * 2).step(5).value(data[0].r).on("slide", function(evt, value) {
        data[0].r = value;
        window.circleRenderer.Render(window.svg, data, window.popupDebug);
      }));
    } else {
      window.showPopup();
    }

  };

  return {
    Render: Render
  };
});
