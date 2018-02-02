angular.module('app').component('toolbar', {
  templateUrl: './toolbar/toolbar.html',
  controller: Toolbar
  // bindings: {}
})
Toolbar.$inject = ['$rootScope', 'contentGraphService']
// Toolbar.$inject = ['serviceSvg','serviceCase', 'servicePartition']
// function Toolbar(serviceSvg, serviceCase, servicePartition) {

function Toolbar($rootScope, contentGraphService) {
  var ctrl = this

  ctrl.$onInit = function() {
    console.log("toolbar init")
    $rootScope.editMode = "map"
  }

  ctrl.clickGenGraph = function() {
    console.log("click gengraph")

    //validate form inputs

    //build graph
    contentGraphService.updateRatiosGraph()
    contentGraphService.testGraph()
    //switch to show graph

    $rootScope.editMode = "graph"
  }
}
