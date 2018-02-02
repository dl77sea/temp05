
// Toolbar.$inject = ['serviceSvg','serviceCase', 'servicePartition']
// function Toolbar(serviceSvg, serviceCase, servicePartition) {
angular.module('app').component('contentGraph', {
  templateUrl: './contentGraph/contentGraph.html',
  controller: ContentGraph
  // bindings: {}
})

function ContentGraph($rootScope, contentGraphService) {
  var ctrl = this
  // ctrl.map = null

  ctrl.$onInit = function() {
    console.log("content graph init")
    contentGraphService.graphInit()
  }
}
ContentGraph.$inject = ['$rootScope', 'contentGraphService']
