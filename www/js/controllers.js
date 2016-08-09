angular.module('simplyHome.controllers', [])

.controller('TabsCtrl', function($scope, currentUser, User, $rootScope) {

  $scope.$watchCollection(function(){
    return User;
  }, function(newVal, oldVal){
    var config_name = newVal.config_name;
    console.log(newVal)
    console.log(oldVal)
    if (config_name === "Renter") {
      $scope.renter = true;
      $scope.agent = false;
      $scope.guest = false;
    } else if (config_name === "Agent") {
      $scope.renter = false;
      $scope.agent = true;
      $scope.guest = false;
    } else {
      $scope.renter = false;
      $scope.agent = false;
      $scope.guest = true;
    }
  })
})
