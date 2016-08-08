angular.module('simplyHome.controllers')

.controller('RenterAppointmentsCtrl', function($scope, $state, $http, SERVER) {

  $scope.getAppointments = function() {

    $http
      .get(SERVER.url + '/api/appointments')
      .then(function(resp) {
        $scope.appointments = resp.data;
      })
  }



})
