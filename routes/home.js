//var express = require('express');
//var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});
//
//module.exports = router;


var express = require('express');
var router = express.Router();

/* GET Customer page. */

//app.get('/home', function(request, response) {
//	if (request.session.loggedin) {
//		response.send('Welcome back, ' + request.session.username + '!');
//	} else {
//		response.send('Please login to view this page!');
//	}
//	response.end();
//});


router.get('/', function (request, response, next) {
  if (request.session.loggedin) {
    response.render('home', {title: "Home", data: request.session.username});
  } else {
    response.render('home', {title: "Home", data: 'Guest'});
  }
//  request.getConnection(function (err, connection) {
//    var query = connection.query('SELECT * FROM member', function (err, rows) {
//      if (err)
//        var errornya = ("Error Selecting : %s ", err);
//      request.flash('msg_error', errornya);
//      response.render('home', {title: "Customers", data: rows});
//    });
//  });
});
module.exports = router;