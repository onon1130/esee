$(document).ready(function () {
//  let scanner = new Instascan.Scanner({video: document.getElementById('preview')});
//  scanner.addListener('scan', function (content) {
//    alert(content);
//  });
//  Instascan.Camera.getCameras().then(function (cameras) {
//    if (cameras.length > 0) {
//      scanner.start(cameras[0]);
//    } else {
//      console.error('No cameras found.');
//    }
//  }).catch(function (e) {
//    console.error(e);
//  });
});


function openQRCamera(node) {
  var reader = new FileReader();
  reader.onload = function () {
    node.value = "";
    qrcode.callback = function (res) {
      if (res instanceof Error) {
        alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
      } else {
        node.parentNode.previousElementSibling.value = res;
      }
    };
    qrcode.decode(reader.result);
  };
  reader.readAsDataURL(node.files[0]);
}

function showQRIntro() {
  return true;
}
//# sourceURL=pen.js
    