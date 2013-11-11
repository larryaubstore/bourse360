define(function () {

  var margin = {top: 20, right: 20, bottom: 30, left: 50};
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom; 

  return {
    width: width,
    height: height,
    margin: margin
  };
});
