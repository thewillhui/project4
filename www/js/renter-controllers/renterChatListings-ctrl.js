angular.module('simplyHome.controllers')

.controller('RenterChatListingsCtrl', ['$scope', 'Agents', 'Listings', function($scope, Agents, Listings) {
  $scope.agents = {};
  $scope.listings = Listings.all();

  // // listings api
  // $scope.listingsApi = {
  //   getListings: function () {
  //     console.log('getlistings')
  //     $http({
  //       url: 'http://localhost:3000/listings',
  //       method: 'get'
  //     }).then(function (resp) {
  //        console.log(resp)
  // //      $scope.listings = resp.data.listings;
  //     })
  //   },
  //   init: function () {
  //     this.getListings();
  //   }
  // };
  // // ctrlInit();
  // $scope.listingsApi.init();
}])