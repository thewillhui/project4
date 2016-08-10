app.controller('RenterAppointmentsCtrl', function($scope, $state, $http, SERVER) {
  $scope.getAppointments = function() {

    $http
      .get(SERVER.url + '/api/appointments')
      .then(function(resp) {
        $scope.appointments = resp.data;
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      })
  }

  $scope.getAppointments();

})
