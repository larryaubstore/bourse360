//var db = require("./userchart/db.js");

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
    //var companyId = req.params.id;
    //var performance = [+3.5, 1, 2, +0.3, 2, 0.5, 10, -12.5];

//    res.render('tesla/tesla', {
//        title: 'Tesla',
//        companyId: companyId
//    });
//
//


    res.render('tesla/tesla', {
        title: 'Tesla'
    });



};
