$(document).ready(function () {
  $(document.body).on('click', '#login', function (e) {
    e.preventDefault();
    var username = $('#username').val();
     var password = $('#password').val();
     console.log('username:'+username);
  console.log('password:'+password);
  if (username && password) {
    console.log('not null');
    loginAction(username,password);
  } else {
    console.log('please enter username password');
  }
});
});
function loginAction(username,password) {
  console.log('check username password');
}
