var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('login', {title: 'login'});
});


router.post('/validate', function (request, response, next) {
  var username = request.body.username;
  var password = request.body.password;
  request.getConnection(function (err, connection) {
    var query = connection.query('SELECT * FROM member WHERE member_email = ? AND password = ?', [username, password], function (err, rows) {
      if (err) {
        response.send('Incorrect Username and/or Password!');
      } else {
        if (rows.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          //response.redirect('/home');
          response.send(rows);
        } else {
          response.send('Incorrect Username and/or Password!');
        }
      }
      // request.flash('msg_error', errornya);
      // response.render('home', {title: "Customers", data: rows});
    });
  });
});

router.post('/validate2', function (request, response) {
  var username = request.body.username;
  var password = request.body.password;

//	if (username && password) {
  connection.query('SELECT * FROM member WHERE member_email = ? AND password = ?', [username, password], function (error, results, fields) {
    if (results.length > 0) {
      request.session.loggedin = true;
      request.session.username = username;
      //response.redirect('/home');
      response.send(results);
    } else {
      response.send('Incorrect Username and/or Password!');
    }
    //response.redirect('/');
  });
//	} else {
//		response.send('Please enter Username and Password!');
//		response.end();
//	}
});

router.post('/studentlist', function (req, res) {
  var db = req.db;
  var collection = db.get('student');
  var query = {};
  if (req.body) {
    query = req.body;
  }
  collection.find(query, function (err, docs) {
    if (err)
      return err;
    res.send(docs);
  });
});
module.exports = router;
