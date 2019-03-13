var productlistData = {};
$(window).load(function () {
  setTimeout(function () {
    window.scrollTo(100,0);
   // alert('top la');
  }, 1000);
});
$(document).ready(function () {
  $(document.body).on('click', '#btn-logout', function (e) {
    $(location).attr('href', '/');
  });
  $(document.body).on('change', '.qrcode-text', function (e) {
    //$(location).attr('href', '/scan');
    // e.preventDefault();
//     $('#scanCamera').change();
    console.log('code:' + $this.val());
    alert('code:' + $this.val());
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
  console.log('productID:'+productID);
// Empty content string
  var $productContainer = $('#product-item-info');
  var tableContent = '';
  var query = {};

  var productQuery;
    productQuery = {'productID': productID};
    $.extend(query, productQuery);
console.log('productQuery:'+productQuery);
  var url = '/home/productinfo';
  $.ajax({
    type: 'POST',
    data: query,
    url: url,
    dataType: 'JSON',
    contentType: "application/x-www-form-urlencoded"
  }).done(function (data) {
    productlistData = data;
    console.log('done');
    $.each(data, function () {
    
      $productContainer.find('.product-name').text(this.product_name);
      $productContainer.find('.product-cat').text(this.product_cat_title);
      $productContainer.find('.product-photo').css('background-image','url(../images/product/'+this.product_ID+'.png)');
      $productContainer.find('.product-price .price .amount').text(this.promo_price);
      $productContainer.find('.product-price .price-ori .amount').text(this.unit_price);
      $productContainer.find('.product-price .price-unit .unit').text(this.qty_per_unit);
//      $productContainer.find('.product-detail-sub .product-kcal .unit').text(this.qty_per_unit);
      $productContainer.find('.product-detail-sub .product-place .unit').text(this.from);
      
 
//      var thisID = this._id;
//      var courseID = this.courseid;
//      var offerNum;
//      offerNum = 0;
//      if (this.offer) {
//        if (this.offer.length > 0) {
//          offerNum = this.offer.length;
//        }
//      }
//      tableContent += '<tr>';
//      tableContent += '<td>' + courseID + '</td>';
//      tableContent += '<td>' + this.title + '</td>';
//      tableContent += '<td>' + this.level + '</td>';
//      tableContent += '<td>' + this.dept.deptName + '</td>';
//      tableContent += '<td class="trigger-btn"><a href="#" class="courseUpdate" data-course-title="' + this.title + '" data-dept-name="' + this.dept.deptName + '" data-dept-id="' + this.dept.deptID + '" data-courseID="' + courseID + '" data-level="' + this.level + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit</a></td>';
//      tableContent += '<td class="trigger-btn"><a href="#" class="courseDelete" data-dept-name="' + this.dept.deptName + '" data-dept-id="' + this.dept.deptID + '" data-obj-id="' + thisID + '" data-courseID="' + courseID + '" rel="' + this._id + '" data-offer-num="' + offerNum + '"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</a></td>';
//      tableContent += '<td class="trigger-btn"><a href="#" class="courseAddOffer" data-course-title="' + this.title + '" data-courseID="' + courseID + '"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add year</a></td>';
//      var offerCount = 0;
//      var thisTitle = this.title;
//      var thisDeptID = this.dept.deptID;
//      var thisDeptName = this.dept.deptName;
//      if (this.offer) {
//        if (this.offer.length > 0) {
//          $.each(this.offer, function () {
//            var thisOffer = [];
//            thisOffer = this;
//            var enrolledStudent;
//            enrolledStudent = 0;
//            if (thisOffer.enrolled) {
//              enrolledStudent = thisOffer.enrolled.length;
//            }
//            ;
//
//            if (thisOffer.year === year || $('#course-year').val() === 'all') {
//              if (offerCount > 0) {
//                tableContent += '</tr><tr><td colspan="7"></td>';
//              }
//              tableContent += '<td>' + thisOffer.year + '</td>';
//              // tableContent += '<td><a href="#" class="studentEnrolled overlayLink"  data-overlay="studentEnrolled" data-offer-year="' + thisOffer.year + '" data-id="' + courseID + '"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>' + enrolledStudent + '</a></td>';
//              var vancancy = thisOffer.available;
//              var availablePercent = parseInt((vancancy / thisOffer.classSize) * 100);
//              var enrolledPercent = 100 - availablePercent;
//
//              var progressCSS = "success";
//              var vancanyclass = "none";
//              if (availablePercent < 100 && availablePercent > 65) {
//                progressCSS = "info";
//
//              } else if (availablePercent <= 65 && availablePercent > 20) {
//                progressCSS = "warning";
//
//              } else if (availablePercent <= 20) {
//                progressCSS = "danger";
//                vancanyclass = "full";
//              }
//              var enrolledPercent = 100 - availablePercent;
//              if (vancancy === 0) {
//                vancancy = "<strong>FULL</strong>";
//              }
//              tableContent += '<td class="progressbar"><a href="#" class="studentEnrolled overlayLink"  data-overlay="studentEnrolled" data-offer-year="' + thisOffer.year + '" data-id="' + courseID + '"><strong>' + enrolledStudent + '</strong> / ' + thisOffer.classSize + ' <span class="glyphicon glyphicon-user" aria-hidden="true"></span> (' + enrolledPercent + '%) <div class="progress">';
//              tableContent += '<div class="progress-bar progress-bar-' + progressCSS + '" style="width: ' + enrolledPercent + '%" aria-valuenow="' + (thisOffer.classSize - thisOffer.available) + '" aria-valuemin="0" aria-valuemax="' + thisOffer.classSize + '"></div></div></a></td>';
//              tableContent += '<td class="vancancy"><span class="' + vancanyclass + '">' + vancancy + '</span></div></td>';
//              tableContent += '<td class="trigger-btn"><a href="#" class="offerUpdate" data-course-title="' + thisTitle + '" data-dept-name="' + thisDeptName + '" data-dept-id="' + thisDeptID + '" data-offer-year="' + thisOffer.year + '" data-courseID="' + courseID + '" data-course-size="' + thisOffer.classSize + '" data-course-available="' + thisOffer.available + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit</a></td>';
//              tableContent += '<td class="trigger-btn"><a href="#" class="offerDelete" data-offer-year="' + thisOffer.year + '" data-courseID="' + courseID + '" data-enrolled-student="' + (thisOffer.classSize - thisOffer.available) + '"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</a></td>';
//              tableContent += '<td class="trigger-btn"><a href="#" class="courseEnroll" data-course-title="' + thisTitle + '" data-offer-year="' + thisOffer.year + '" data-dept-name="' + thisDeptName + '" data-dept-id="' + thisDeptID + '" data-obj-id="' + thisID + '" data-courseID="' + courseID + '"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Enroll</a></td>';
//              offerCount++;
//              totalNumStudent = totalNumStudent + enrolledStudent;
//            }
//          });
//        } else {
//          tableContent += '<td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td>';
//        }
//      } else {
//
//        tableContent += '<td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td>';
//      }
//      tableContent += '</tr>';
      
      
    });
//    tableContent += '<tr class="totalrow"><td colspan="8" class="totalTitle">Total no. of student Enrolled: </td><td class="totalNum">'+totalNumStudent+'</td><td colspan="4" class="totalNum"></td></tr>';
//    $('#courseList table tbody').html(tableContent);
$('#home-landing').hide("slide", { direction: "left" }, 300);
$('#product-item').show();
  });
}