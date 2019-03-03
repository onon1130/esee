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
      });
  

//    $.each(data, function () {
//      hasEnrolled = false;
//      var thisID = this.studentID;
//      tableContent += '<tr>';
//      tableContent += '<td>' + this.studentID + '</td>';
//      tableContent += '<td><span class="glyphicon glyphicon-user" aria-hidden="true"></span> ' + this.studentName + '</td>';
//      tableContent += '<td>' + formatDate(this.dob) + '</td>';
//      if (this.enrolled && this.enrolled.length > 0) {
//
//        $.each(this.enrolled, function () {
//          var thisEnroll = [];
//          thisEnroll = this;
//          if (((thisEnroll.year === year) && (thisEnroll.CourseID === courseID))) {
//            hasEnrolled = true;
//          }
//        });
//      }
//      if (hasEnrolled) {
//        tableContent += '<td></td>';
//      } else {
//        tableContent += '<td><button type="button" class="btn btn-primary studentEnrollCourse" data-studentID="' + thisID + '">Enroll</button></td>';
//      }
//      tableContent += '</tr>';
//    });
//    $('#searchStudentResult').fadeIn();
//    $('#searchStudentResult table tbody').html(tableContent);
  })
          .fail (function (msg) {
          
      console.log('no user');
   
  });

}