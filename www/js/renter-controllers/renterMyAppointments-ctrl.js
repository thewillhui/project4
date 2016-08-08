angular.module('simplyHome.controllers')

.controller('RenterAppointmentsCtrl', function($scope, $state, $http) {

  $scope.getAppointments = function() {

    $http
      .get('http://localhost:3000/api/appointments')
      .then(function(resp) {
        $scope.appointments = resp.data;
      })
  }



})
