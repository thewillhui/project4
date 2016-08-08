angular.module('simplyHome.controllers')

.controller('RenterAccountCtrl', function($scope, currentUser) {

  $scope.getCurrentUser = currentUser.getProperty;

})

