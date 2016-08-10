app.controller('RenterMyEnquiriesCtrl', function($scope, $http, $ionicScrollDelegate, SERVER) {

  $scope.changeDisplay = function(enquiry) {
    var showDetail = enquiry.showDetail;

    $scope.myEnquiries.map(function(x) {
      x.showDetail = false;
      x.limitTo = 3;
    });

    if (showDetail === false) {
      enquiry.showDetail = !enquiry.showDetail;
      enquiry.limitTo = enquiry.areas.length;
    }
  };

  $scope.getEnquiries = function() {
    $http
    .get(SERVER.url + '/api/enquiries')
    .then(function(resp) {
      // inject virtual attributes to control display in front-end
      $scope.myEnquiries = resp.data.map(function(x, index) {
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
  $scope.getEnquiries();

  $scope.dateTime = '';
  var dateTime = $scope.dateTime;

  $scope.parseDateTime = function(dateTime) {
    return moment(dateTime).fromNow();
  };

  $scope.scrollResize = function() {
    $ionicScrollDelegate.resize();
  };
})