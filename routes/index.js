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
 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'eSee' });
  req.session.destroy();
});

module.exports = router;