angular.module('simplyHome.controllers', [])

.controller('TabsCtrl', function($scope, currentUser) {

  $scope.renter = false;
  $scope.agent = false;
  $scope.guest = true;

  $scope.checkUserType = function() {
    if (currentUser.getProperty() === "Renter") {
      $scope.renter = true;
      $scope.agent = false;
      $scope.guest = false;
    } else if (currentUser.getProperty() === "Agent") {
      $scope.renter = false;
      $scope.agent = true;
      $scope.guest = false;
    } else {
      $scope.renter = false;
      $scope.agent = false;
      $scope.guest = true;
    }


  }

  $scope.checkUserType();
})
