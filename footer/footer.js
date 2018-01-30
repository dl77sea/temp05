angular.module('app').component('footer', {
  templateUrl: './footer/footer.html',
  controller: Footer
  // bindings: {}
})

// Toolbar.$inject = ['serviceSvg','serviceCase', 'servicePartition']
// function Toolbar(serviceSvg, serviceCase, servicePartition) {

function Footer() {
  var ctrl = this

  ctrl.$onInit = function() {
    console.log("footer init")
  }
}
