//var t = 1297110663, // start time
//  v = 70, // start value (subscribers)
//  data = d3.range(33).map(next); // starting dataset
// 
// function next() {
//   return {
//     time: ++t,
//     value: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
//  };
//}

exports.show = function(req, res) {

    var userId = req.params.id;

    res.render('userchart', {
        title: 'ChartView',
        userId: userId 
    })
}
