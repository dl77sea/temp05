
// Toolbar.$inject = ['serviceSvg','serviceCase', 'servicePartition']
// function Toolbar(serviceSvg, serviceCase, servicePartition) {

function ContentGraph($rootScope) {
  var ctrl = this
  // ctrl.map = null

  ctrl.$onInit = function() {
    console.log("content map init")
  }
}
angular.module('app').component('contentGraph', {
  templateUrl: './contentGraph/contentGraph.html',
  controller: ContentGraph
  // bindings: {}
})
// ContentGraph.$inject = ['contentGraphService']
