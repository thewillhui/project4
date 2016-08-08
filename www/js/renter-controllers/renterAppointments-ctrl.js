angular.module('simplyHome.controllers')
.controller('RenterAppointmentsCtrl', function($http, $scope, SERVER){
  $scope.appointments = [];

  $scope.confirmAppointments = function(id){
    console.log(id);
    $http
      .put(SERVER.url + '/api/appointments/confirm/' + id)
      .then(function(resp){
        console.log(resp);
        $scope.confirm = "Confirmed"
      })

  }
  $scope.cancelAppointments = function(id, key){
    console.log(id);
    $http
      .delete(SERVER.url + '/api/appointments/' + id)
      .then(function(resp){
        console.log(resp)
        $scope.appointments.splice(key, 1)
      })
  }
  var getAppointments = function(){
    $http
      .get(SERVER.url + '/api/appointments')
      .then(function(resp){
        // console.log(resp.data);
        $scope.appointments = resp.data;
        console.log($scope.appointments);
      })
  }
  getAppointments();

})