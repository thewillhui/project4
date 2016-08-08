app.controller('AgentAppointmentsCtrl', function($http, $scope){
  $scope.appointments = [];

  // $scope.confirmAppointments = function(id){
  //   console.log(id);
  //   $http
  //     .put('http://localhost:3000/api/appointments/confirm/' + id)
  //     .then(function(resp){
  //       console.log(resp);
  //       $scope.confirm = "Confirmed"
  //     })

  // }
  $scope.cancelAppointments = function(id, key){
    console.log(id);
    $http
      .delete('http://localhost:3000/api/appointments/' + id)
      .then(function(resp){
        console.log(resp)
        $scope.appointments.splice(key, 1)
      })
  }
  var getAppointments = function(){
    $http
      .get('http://localhost:3000/api/appointments')
      .then(function(resp){
        // console.log(resp.data);
        $scope.appointments = resp.data;
        console.log($scope.appointments);
      })
  }
  getAppointments();

})