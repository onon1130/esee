$(document).ready(function () {
  $(document.body).on('click', '#login', function (e) {
    e.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();
    console.log('username:' + username);
    console.log('password:' + password);
    if (username && password) {
      console.log('not null');
      loginAction(username, password);
    } else {
      console.log('please enter username password');
    }
  });
});
function loginAction(username, password) {
  ///login/validate
  console.log('check username password');
  var usernameQuery = {"username": username};
  var passwordQuery = {"password": password};
  console.log('usernameQuery' + usernameQuery);
  console.log('passwordQuery' + passwordQuery);
  var query = {};
// Empty content string
  $.extend(query, usernameQuery, passwordQuery);
  console.log('query:' + query);
  var url = '/login/validate';
  $.ajax({
    type: 'POST',
    data: query,
    url: url,
    dataType: 'JSON'
  }).done(function (data) {
    console.log('data:' + data.length);

    

      $.each(data, function () {
        console.log('msg:' + this.member_name);
        $(location).attr('href','/home');
      });
      


  })
          .fail (function (msg) {
          
      console.log('no user');
   
  });

}