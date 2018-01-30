//helper functions for SVG shape drawing and event handling
angular.module('app').service('serviceMode', serviceMode)

function serviceMode() {
  var vm = this

  //possible modes: "map", "graph"
  vm.mode = "map"

  // vm.getSvgPoint = function(domX, domY) {
  //   let pt = vm.svgEl.createSVGPoint();
  //   pt.x = domX;
  //   pt.y = domY;
  //   let svgP = pt.matrixTransform(vm.svgEl.getScreenCTM().inverse())
  //   return svgP;
  // }
}
