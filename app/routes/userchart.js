
/*
 * GET User Chart.
 */

exports.show = function(req, res){
//  if(!req.params.id) {
//    res.send(404, 'Sorry, we cannot find that!');
//  } else {
    var userId = req.params.id;
      
    res.render('userchart', {
        title: 'ChartView',
        userId: userId
    })
//  }
};
