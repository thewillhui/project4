angular.module('simplyHome.controllers')

.controller('RenterListingsCtrl', function(currentApartment, $scope, $auth, $http) {
  $scope.listings = [];
  $scope.search = '';

  $scope.viewApartment = function(key, akey){
    console.log(key, akey);
    // console.log($scope.listings[key].properties[akey])
    currentApartment.setProperty($scope.listings[key].properties[akey]);
    console.log(currentApartment.getProperty());
  }
  var getListings = function(){
    $http
      .get('http://localhost:3000/api/property_listings')
      .then(function(resp){
        console.log(resp.data);
        $scope.listings = resp.data
      })
  }
  getListings();
})