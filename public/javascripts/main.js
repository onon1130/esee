$(document).ready(function () {
   $(document.body).on('click', '#btn-logout', function (e) {
     $(location).attr('href', '/');
   });
    $(document.body).on('click', '#btn-scan-qrcode', function (e) {
     $(location).attr('href', '/scan');
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
  
 
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
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