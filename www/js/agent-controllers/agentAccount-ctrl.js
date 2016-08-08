app.controller('AgentAccountCtrl', function($scope, currentUser) {

  $scope.getCurrentUser = currentUser.getProperty;
})