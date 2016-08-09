angular.module('simplyHome.controllers')
.controller('AgentAppointmentsCtrl', function($http, $scope, SERVER){
  $scope.appointments = [];

  $
  var getAppointments = function(){
    $http
      .get(SERVER.url + '/api/appointments')
      .then(function(resp){
        $scope.appointments = resp.data;
        console.log($scope.appointments);
      })
  }
  getAppointments();

})