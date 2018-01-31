function Footer(contentGraphService, $rootScope) {
  var ctrl = this

  ctrl.$onInit = function() {
    console.log("footer init")
  }

  ctrl.clickBackToMap = function() {
    console.log("btm")
    $rootScope.editMode = "map"
  }
}


angular.module('app').component('footer', {
  templateUrl: './footer/footer.html',
  controller: Footer
  // bindings: {}
})

Footer.$inject = ['contentGraphService','$rootScope']
