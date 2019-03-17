var productlistData = {};
var tableContent;
$(window).load(function () {
  setTimeout(function () {
    window.scrollTo(100, 0);
    // alert('top la');
  }, 1000);
});
$(document).ready(function () {
  showHomepage();
  $(document.body).on('click', '.btn-logout', function (e) {
    $(location).attr('href', '/');
  });
  $(document.body).on('click', '.btn-back', function (e) {
    var backTo = $(this).attr('data-back-fn');
    if (backTo === 'home') {
      showHomepage();
    }
    if (backTo === 'product') {
      // if ($('#product-item').css('display') === 'block') {
      $('#recipe-detail').fadeOut();
      // }
      $('#product-item').show("slide", {direction: "left"}, 300);
      $(this).attr('data-back-fn','home');
      // }
    }
  });
  $(document.body).on('click', '.btn-recipe-detail', function (e) {
    e.preventDefault();
    var recipeID = $(this).attr('data-recipe-id');
    loadRecipePage(recipeID, $(this));
  });
  $(document.body).on('click', '.btn-recipe-in', function (e) {
    e.preventDefault();
    $(this).parents('.section-tab').find('a').removeClass('active');
    $(this).addClass('active');
    $('#recipe-ingredient-step').fadeIn();
    $('#recipe-nutrition-list').hide();
  });
  $(document.body).on('click', '.btn-recipe-engry', function (e) {
    e.preventDefault();
    $(this).parents('.section-tab').find('a').removeClass('active');
    $(this).addClass('active');
    $('#recipe-ingredient-step').hide();
    $('#recipe-nutrition-list').fadeIn();
  });

  $(document.body).on('click', '#login', function (e) {
    e.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();
    if (username && password) {
      loginAction(username, password);
    } else {
      console.log('please enter username password');
    }
  });
  $(document.body).on('click', '.btn-product-item', function (e) {
    e.preventDefault();
    var productID = $(this).attr('data-product-id');
    loadProductPage(productID);
  });


  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    autoplay: {
      delay: 5000
    },
    //loop: true,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });

});
function loginAction(username, password) {
  var usernameQuery = {"username": username};
  var passwordQuery = {"password": password};
  var query = {};
// Empty content string
  $.extend(query, usernameQuery, passwordQuery);
  var url = '/login/validate';
  $.ajax({
    type: 'POST',
    data: query,
    url: url,
    dataType: 'JSON'
  }).done(function (data) {
    $('.login-form').find('.error-msg').hide();
    $.each(data, function () {
      $(location).attr('href', '/home');
    });
  }).fail(function (msg) {
    $('.login-form').find('.error-msg').show();
    //console.log('no user');
  });

}

function loadProductPage(productID) {
  console.log('productID:' + productID);
  if ($('#home-landing').css('display') === 'block') {
    $('#home-landing').hide("slide", {direction: "left"}, 300);
  }
  ;
  $('#loading-wrapper').fadeIn(100);
  $('#product-item-recipe-list #recipe .section-tab').hide();
// Empty content string
  var $productContainer = $('#product-item-info');
  var tableContent = '';
  var query = {};

  var productQuery;
  productQuery = {'productID': productID};
  $.extend(query, productQuery);
  var url = '/home/productinfo';
  $.ajax({
    type: 'POST',
    data: query,
    url: url,
    dataType: 'JSON',
    contentType: "application/x-www-form-urlencoded"
  }).done(function (data) {
    productlistData = data;
    console.log('product info done');

    $.each(data, function () {

      $productContainer.find('.product-name').text(this.product_name);
      $productContainer.find('.product-cat').text(this.product_cat_title);
      $productContainer.find('.product-photo').css('background-image', 'url(../images/product/' + this.product_ID + '.png)');
      $productContainer.find('.product-price .price .amount').text(this.promo_price);
      $productContainer.find('.product-price .price-ori .amount').text(this.unit_price);
      $productContainer.find('.product-price .price-unit .unit').text(this.qty_per_unit);
//      $productContainer.find('.product-detail-sub .product-kcal .unit').text(this.qty_per_unit);
      $productContainer.find('.product-detail-sub .product-place .unit').text(this.from);
    });

  });
  var recipeQuery;
  recipeQuery = {'productID': productID};

  var urlRecipe = '/home/productRecipe';
  $.ajax({
    type: 'POST',
    data: recipeQuery,
    url: urlRecipe,
    dataType: 'JSON',
    contentType: "application/x-www-form-urlencoded"
  }).done(function (data) {

    tableContent = '';
    tableContent += '<ul class="recipe-list">';
    if (data.length > 0) {
      $('#product-item-recipe-list #recipe .section-tab').show();
      $.each(data, function () {
        tableContent += '<li class="recipe-list-item"><a href="#" data-back-to="product" data-recipe-id="' + this.recipe_ID + '" style="background-image: url(../images/recipe/' + this.recipe_ID + '.png);" class="recipe-image btn-recipe-detail"></a><div class="recipe-cat">' + this.recipe_cat_title + '</div><div class="recipe-title"> <a href="#" data-back-to="product" data-recipe-id="' + this.recipe_ID + '" class="title-name btn-recipe-title btn-recipe-detail">' + this.recipe_title + '</a><span class="btn-like"><span class="icon icon-like color"></span><span class="content">' + this.likes + '</span></span></div><div class="recipe-details"><div class="recipe-details-item time"> <span class="icon icon-time"></span><span class="content">' + this.duration + '</span></div><div class="recipe-details-item level"><span class="icon icon-level"></span><span class="content">' + this.level + '</span></div><div class="recipe-details-item kcal"> <span class="icon icon-kcal"></span><span class="content">' + this.engry_total + 'kcal</span></div><div class="recipe-details-item"><span class="icon icon-price"></span><span>$--</span></div></div><span class="sr-only per-serve">'+this.num_of_serve+'</span></li>';
      });
      tableContent += '</ul>';

      $('#product-item-recipe-list #recipe .section-content').html(tableContent);
    } else {

      $('#product-item-recipe-list #recipe .section-content').html('<span class="no-result">We are so sorry.<br /> No recipe for this product yet</span>');
    }
    $('#loading-wrapper').fadeOut(100);
    showProductPage();
  });

}

function showHomepage() {
  if ($('#home-landing').css('display') === 'none') {
    if ($('#product-item').css('display') === 'block') {
      $('#product-item').fadeOut();
    }
    $('#home-landing').show("slide", {direction: "left"}, 300);
  }
  $('.nav-left-action').find('.btn-logout').show();
  $('.nav-left-action').find('.btn-back').hide();
}
function showProductPage() {

  $('#product-item').show();
  $('.nav-left-action').find('.btn-logout').hide();
  $('.nav-left-action').find('.btn-back').show().attr('data-back-fn', 'home');
}
function loadRecipePage(recipeID, selector) {
  var backto = selector.attr('data-back-to');
  var $parentSelecor = selector.parents('.recipe-list-item');
  var cat = $parentSelecor.find('.recipe-cat').text();
  var rTitle =$parentSelecor.find('.recipe-title .title-name').text();
  var like = $parentSelecor.find('.btn-like .content').text();
  var time = $parentSelecor.find('.time .content').text();
  var perServe = $parentSelecor.find('.per-serve').text();
  console.log('time:'+time);
  var level = $parentSelecor.find('.level .content').text();
  var kcal = $parentSelecor.find('.kcal .content').text();
  var $displayDetailWrapper = $('#recipe-detail').find('#recipe-info');
  var $displayTabWrapper = $('#recipe-detail').find('.section-tab');
  $displayDetailWrapper.find('.recipe-cat').text(cat);
  $displayDetailWrapper.find('.recipe-title .title-name').text(rTitle);
  $displayDetailWrapper.find('.recipe-image').css('background-image', 'url(../images/recipe/' + recipeID + '.png)');
  $displayDetailWrapper.find('.btn-like .content').text(like);
  $displayDetailWrapper.find('.recipe-serve .content').text(perServe);
  $displayTabWrapper.find('.time').find('.content').text(time);
  $displayTabWrapper.find('.level').find('.content').text(level);
  $displayTabWrapper.find('.kcal').find('.content').text(kcal);
  $('.nav-left-action').find('.btn-logout').hide();
  $('.nav-left-action').find('.btn-back').show().attr('data-back-fn', backto);
  if ($('#home-landing').css('display') === 'block') {
    $('#home-landing').hide("slide", {direction: "left"}, 300);
  }
  ;
  if ($('#product-item').css('display') === 'block') {
    $('#product-item').hide("slide", {direction: "left"}, 300);
  }
  ;
  $('#loading-wrapper').fadeIn(100);
  
  
  var recipeQuery;
  recipeQuery = {'recipeID': recipeID};

  var urlRecipe = '/home/recipeIn';
  $.ajax({
    type: 'POST',
    data: recipeQuery,
    url: urlRecipe,
    dataType: 'JSON',
    contentType: "application/x-www-form-urlencoded"
  }).done(function (data) {

    tableContent = '';
    tableContent += '<ul class="recipe-ingredient">';
    if (data.length > 0) {
      
      $.each(data, function () {
        tableContent += '<li class="recipe-ingredient-item">'+ this.amount+' <strong>'+ this.ingredient_name+'</strong></li>';
      });
      tableContent += '</ul>';

      $('#recipe-ingredient-step .ingredient-list .ingredient-content').html(tableContent);
    } else {
      console.log('no data');
      $('#recipe-detail #recipe-ingredient-step .ingredient-list .ingredient-content').html('<span class="no-result">We are so sorry.<br /> Ingredient items can not be provided yet</span>');
    }
    $('#loading-wrapper').fadeOut(100);
    $('#recipe-detail').show();
  }).fail(function (data) {
    console.log('fail.....');
  });
  var urlStep = '/home/recipeStep';
  $.ajax({
    type: 'POST',
    data: recipeQuery,
    url: urlStep,
    dataType: 'JSON',
    contentType: "application/x-www-form-urlencoded"
  }).done(function (data) {

    tableContent = '';
    tableContent += '<ol class="recipe-step">';
    if (data.length > 0) {
      
      $.each(data, function () {
        tableContent += '<li class="recipe-step-item">'+ this.instruction+'</li>';
      });
      tableContent += '</ol>';
      console.log('step:'+tableContent);
      $('#recipe-ingredient-step .step-list .step-content').html(tableContent);
    } else {
      console.log('no data');
      $('#recipe-detail #recipe-ingredient-step .step-list .step-content').html('<span class="no-result">We are so sorry.<br /> Steps can not be provided yet</span>');
    }
    $('#loading-wrapper').fadeOut(100);
    $('#recipe-detail').show();
  }).fail(function (data) {
    console.log('fail.....');
  });
  
    var urlKcal = '/home/recipeKcal';
  $.ajax({
    type: 'POST',
    data: recipeQuery,
    url: urlKcal,
    dataType: 'JSON',
    contentType: "application/x-www-form-urlencoded"
  }).done(function (data) {
    var addClass;
    tableContent = '';
    tableContent += '<div class="kcal_title">Amount Per Serving</div><ul class="nutrition-detail">';
    if (data.length > 0) {
      
      $.each(data, function () {
        if (parseInt(this.nutrition_ID) % 10 === 0 ) {
          addClass=" subTitle";
        } else {
          addClass="";
        }
        tableContent += '<li class="nutrition-detail-item'+addClass+'">'+ this.nutrition_name+': '+this.amount+ this.nutrition_unit+'</li>';
      });
      tableContent += '</ul>';
      console.log('step:'+tableContent);
      $('#recipe-nutrition-list .nutrition-list .nutrition-content').html(tableContent);
    } else {
      console.log('no data');
      $('#recipe-detail #recipe-ingredient-step .nutrition-list .nutrition-content').html('<span class="no-result">We are so sorry.<br /> Steps can not be provided yet</span>');
    }
    $('#loading-wrapper').fadeOut(100);
    $('#recipe-detail').show();
  }).fail(function (data) {
    console.log('fail.....');
  });
}