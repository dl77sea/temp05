angular.module('app').component('contentMap', {
  templateUrl: './contentMap/contentMap.html',
  controller: ContentMap
  // bindings: {}
})

// Toolbar.$inject = ['serviceSvg','serviceCase', 'servicePartition']
// function Toolbar(serviceSvg, serviceCase, servicePartition) {

function ContentMap($rootScope) {
  var ctrl = this
  // ctrl.map = null

  ctrl.gridInc = 0.0625

  ctrl.$onInit = function($rootScope) {
    console.log("content graph init")

    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 47.0,
        lng: -122.0
      },
      zoom: 8
    });

    let gridX = 18
    let gridY = 18
    let latStartCen = 48.09375
    let lonStartCen = -122.7812
    let gridInc = ctrl.gridInc

    //row
    for (let i = 0; i < gridY; i++) {
      //square
      for (let j = 0; j < gridX; j++) {
        //lon decreases to east
        //lat decreases to south

        // let swCornerLat = latStartCen - gridInc
        // let swCornerLng = lonStartCen - gridInc
        // let neCornerLat = latStartCen + gridInc
        // let neCornerLng = lonStartCen + gridInc

        //this block produces a correct grid square
        // let swCornerLat = (latStartCen - gridInc) + (i*(gridInc*2))
        // let swCornerLng = (lonStartCen - gridInc) + (j*(gridInc*2))
        // let neCornerLat = (latStartCen + gridInc) + (i*(gridInc*2))
        // let neCornerLng = (lonStartCen + gridInc) + (j*(gridInc*2))
        //
        // let swCorner = {lat: swCornerLat, lng: swCornerLng}
        // let neCorner = {lat: neCornerLat, lng: neCornerLng}

        let swCornerLat = (latStartCen - gridInc) - (i*(gridInc*2))
        let swCornerLng = (lonStartCen - gridInc) + (j*(gridInc*2))

        let neCornerLat = (latStartCen + gridInc) - (i*(gridInc*2))
        let neCornerLng = (lonStartCen + gridInc) + (j*(gridInc*2))

        let swCorner = {lat: swCornerLat, lng: swCornerLng}
        let neCorner = {lat: neCornerLat, lng: neCornerLng}

        let square = new google.maps.LatLngBounds(swCorner, neCorner)
        console.log(square)

        let tile = new google.maps.Rectangle({
          strokeColor: '#A0A0A0',
          // jointType: BEVEL,
          strokeOpacity: 1.0,
          strokeWeight: 1.0,
          fillColor: '#FF0000',
          fillOpacity: 0.0,
          map: map,
          bounds: square
          // bounds: {
          //   swCornerLat: swCornerLat,
          //   swCornerLng: swCornerLng,
          //   neCornerLat: neCornerLat,
          //   neCornerLng: neCornerLng
          // }
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
    console.log("sw corner: ", vertices.getSouthWest().lat())
    console.log("sw corner: ", vertices.getSouthWest().lng())
    console.log("ne corner: ", vertices.getNorthEast().lat())
    console.log("ne corner: ", vertices.getNorthEast().lng())

    //lon decreases to east
    //lat decreases to south

    console.log("cen lat: ", vertices.getSouthWest().lat() + ctrl.gridInc)
    console.log("cen lng: ", vertices.getSouthWest().lng() + ctrl.gridInc)
  }

}
