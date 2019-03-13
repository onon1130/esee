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
    var displayName = request.session.member_name;
  } else {
    var displayName = 'Guest';
  }
  var promoRow = {};
  var recipeRow = {};
  request.getConnection(function (err, connection) {
    var query = connection.query('SELECT product_promo.product_ID, product.product_name, product.unit_price, product_promo.promo_price, product.qty_per_unit, product_cat.product_cat_name FROM product_promo INNER JOIN product ON product_promo.product_ID=product.product_ID INNER JOIN product_cat ON product_cat.product_cat_ID=product.product_cat_ID', function (err, rows) {
      if (err)
        var errornya = ("Error Selecting : %s ", err);
      request.flash('msg_error', errornya);
      promoRow = rows;
      // response.render('home', {title: "Home", promoData: promoRow, recipeData: recipeRow, memberName: displayName});
    });
    var query2 = connection.query('SELECT * from recipe INNER JOIN recipe_cat ON recipe_cat.recipe_cat_ID=recipe.recipe_cat_ID order by recipe.likes desc LIMIT 5', function (err, rows) {
      if (err)
        var errornya = ("Error Selecting : %s ", err);
      request.flash('msg_error', errornya);
      recipeRow = rows;
      response.render('home', {title: "Home", promoData: promoRow, recipeData: recipeRow, memberName: displayName});
    });


  });

});

/* GET productinfo. */
router.post('/productinfo', function (req, res) {
  var getQuery = req.body;
  var productID = getQuery.productID;
  req.getConnection(function (err, connection) {
    var query = connection.query('SELECT product_promo.product_ID, product.product_name, product.unit_price, product_promo.promo_price, product.qty_per_unit,product.from, product_cat.product_cat_name FROM product_promo INNER JOIN product ON product_promo.product_ID=product.product_ID INNER JOIN product_cat ON product_cat.product_cat_ID=product.product_cat_ID WHERE product.product_ID="'+productID+'"', function (err, rows) {
    if (err)
      return err;
    res.send(rows);
    });
  });
});
/* GET productrecipe. */
router.post('/productRecipe', function (req, res) {
  var getQuery = req.body;
  var productID = getQuery.productID;
  req.getConnection(function (err, connection) {
    var query = connection.query('Select * from recipe INNER JOIN recipe_cat where recipe.recipe_cat_ID = recipe_cat.recipe_cat_ID and recipe.recipe_ID IN (Select recipe_ingredient.recipe_ID FROM recipe_ingredient where recipe_ingredient.ingredient_ID IN (Select product.ingredient_ID from product where product.product_ID="'+productID+'"))', function (err, rows) {
    if (err)
      return err;
    res.send(rows);
    });
  });
});

/* GET recipeIn. */
router.post('/recipeIn', function (req, res) {
  var getQuery = req.body;
  var recipeID = getQuery.recipeID;
  req.getConnection(function (err, connection) {
    var query = connection.query('SELECT * FROM recipe_ingredient INNER JOIN ingredient where ingredient.ingredient_ID = recipe_ingredient.ingredient_ID and recipe_ingredient.recipe_ID="'+recipeID+'" order by squence_num;', function (err, rows) {
    if (err)
      return err;
    res.send(rows);
    });
  });
});

module.exports = router;