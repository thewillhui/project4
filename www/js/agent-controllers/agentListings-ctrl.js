app.controller('ListingsCtrl', function($scope, $http, $state, SERVER, $ionicScrollDelegate){
  $scope.changeDisplay = function(listing) {
    var showDetail = listing.showDetail;
    console.log(listing)
    $scope.listings.map(function(x) {
      x.showDetail = false;
      x.limitTo = 3;
    });

    if (showDetail === false) {
      listing.showDetail = !listing.showDetail;
      listing.limitTo = listing.area.length;
    }
};
  $scope.getListing = function() {
    $http
      .get(SERVER.url + '/api/apartments')
      .then(function successCallback(response) {
        $scope.listings = response.data.map(function(x, index) {
          x.index = index + 1;
          x.limitTo = 3;
          x.showDetail = false;
          return x;
          })
        })
        .finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
            })
        };

  $scope.getListing();

  $scope.scrollResize = function() {
    $ionicScrollDelegate.resize();
  };
})