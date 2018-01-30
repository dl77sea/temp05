angular.module('app').component('contentMap', {
  templateUrl: './contentMap/contentMap.html',
  controller: ContentMap
  // bindings: {}
})


// Toolbar.$inject = ['serviceSvg','serviceCase', 'servicePartition']
// function Toolbar(serviceSvg, serviceCase, servicePartition) {

function ContentMap() {
  var ctrl = this
  // ctrl.map = null


  ctrl.$onInit = function() {
    console.log("content map init")
    
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 47.0,
        lng: -122.0
      },
      zoom: 8
    });

    let gridX = 40
    let gridY = 30
    let latStart = 46.5 //45.65625
    let lonStart = -121.0 //-120.90625
    let gridInc = 0.0625

    for (let i = 0; i < gridY; i++) {
      for (let j = 0; j < gridX; j++) {
        let n = latStart + (gridInc * i)
        let s = n + gridInc
        let e = lonStart - (gridInc * j)
        let w = e - gridInc

        let tile = new google.maps.Rectangle({
          strokeColor: '#A0A0A0',
          // jointType: BEVEL,
          strokeOpacity: 1.0,
          strokeWeight: 1.0,
          fillColor: '#FF0000',
          fillOpacity: 0.0,
          map: map,
          bounds: {
            north: n,
            south: s, //+0.0625
            east: e,
            west: w //-0.0625
          }
        });
        tile.addListener('click', ctrl.cbGrid);
        tile.addListener('mouseover', function(event) {
          tile.setOptions({
            strokeColor: '#FFF',
            zIndex: 99999,
            strokeWeight: 2.0
          })
        })
        tile.addListener('mouseout', function(event) {
          tile.setOptions({
            strokeColor: '#A0A0A0',
            zIndex: 1,
            strokeWeight: 1.0
          })
        })
      }
    }

  }

  // google.maps.event.addDomListener(window, 'load', ctrl.mapInit);
  // angular.element('map').ready(function() {
  //   console.log("sffnarf")
  //   ctrl.mapInit()
  // });

  ctrl.cbGrid = function(event) {
    let vertices = this.getBounds()
    console.log(vertices.getSouthWest().lat())
    console.log(vertices.getSouthWest().lng())
    console.log(vertices.getNorthEast().lat())
    console.log(vertices.getNorthEast().lng())
  }

}
