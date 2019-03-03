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

router.get('/', function (req, res, next) {
  req.getConnection(function (err, connection) {
    var query = connection.query('SELECT * FROM member', function (err, rows) {
      if (err)
        var errornya = ("Error Selecting : %s ", err);
      req.flash('msg_error', errornya);
      res.render('home', {title: "Customers", data: rows});
    });
  });
});
module.exports = router;