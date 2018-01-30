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
  }

  ctrl.clickGenGraph = function() {
    console.log("click gengraph")
    contentGraphService.testGraph()

    //validate form inputs

    //build graph

    //switch to show graph
    if($rootScope.editMode=="map") {
      $rootScope.editMode = "graph"
    } else {
      $rootScope.editMode = "map"
    }


  }
}
