function Footer(contentGraphService, $rootScope) {
  var ctrl = this

  ctrl.$onInit = function() {
    $rootScope.editMode = "map"
    console.log("footer init")
  }
}


angular.module('app').component('footer', {
  templateUrl: './footer/footer.html',
  controller: Footer
  // bindings: {}
})

Footer.$inject = ['contentGraphService', '$rootScope']
