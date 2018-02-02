
function Toolbar($rootScope, contentGraphService) {
  var ctrl = this

  ctrl.$onInit = function() {
    console.log("toolbar init")
    $rootScope.lat = null
    $rootScope.lng = null
    $rootScope.coords = false
    $rootScope.editMode = "map"
  }

  ctrl.clickGenGraph = function() {
    console.log("click gengraph")
    $rootScope.startYear = $rootScope.startYearIn
    $rootScope.endYear = $rootScope.endYearIn
    //validate form inputs

    //build graph
    $rootScope.graphRatiosTitle = "Ratio of Stream Flow"
    $rootScope.graphProbabilityTitle = "Probability of Stream Ratio Above Threshold"
    contentGraphService.updateRatiosGraph()
    contentGraphService.updateProbabilityGraph()
    //switch to show graph

    $rootScope.editMode = "graph"
  }
}
angular.module('app').component('toolbar', {
  templateUrl: './toolbar/toolbar.html',
  controller: Toolbar
  // bindings: {}
})
Toolbar.$inject = ['$rootScope', 'contentGraphService']
// Toolbar.$inject = ['serviceSvg','serviceCase', 'servicePartition']
// function Toolbar(serviceSvg, serviceCase, servicePartition) {
