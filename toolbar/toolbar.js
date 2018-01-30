angular.module('app').component('toolbar', {
  templateUrl: './toolbar/toolbar.html',
  controller: Toolbar
  // bindings: {}
})

// Toolbar.$inject = ['serviceSvg','serviceCase', 'servicePartition']
// function Toolbar(serviceSvg, serviceCase, servicePartition) {

function Toolbar() {
  var ctrl = this

  ctrl.$onInit = function() {
    console.log("toolbar init")
  }
}
