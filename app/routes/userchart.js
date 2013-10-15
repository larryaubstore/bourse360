var db = require("./userchart/db.js");

var requirejs = require("requirejs");

/*
 * GET User Chart.
 */

exports.show = function(req, res){
//  if(!req.params.id) {
//    res.send(404, 'Sorry, we cannot find that!');
//  } else {
//
//
    var userId = req.params.id;
    //var performance = [ { index: 1, value: -3.5}, {index:2, value:1}, {index:3, value:2}, {index:4, value:-0.3}, {index:5, value:2}, {index:6, value:0.5}, {index:7, value:2} ];
    //var performance = [1, 2, 3, 4, 5];
    //
   

    var obj = {};
    obj.test = 1; 

    var performance = [-3.5, 1, 2, -0.3, 2, 0.5, 2];
    //var performance = obj;


    res.render('userchart', {
        title: 'ChartView',
        userId: userId,
        performance: performance
    });
};
