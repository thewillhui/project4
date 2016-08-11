app.controller('RenterAccountCtrl', function($scope, $http, currentUser, SERVER) {

  $scope.getUser = function() {
    $http
      .get(SERVER.url + '/api/userinfos')
      .then(function(resp) {
        console.log(resp.data)
        $scope.user = resp.data;
        $scope.userType = resp.data.type;
      })
  };

  $scope.user = {}

  $scope.updateUser = function(user) {

    var id = user.id;

    if ($scope.userType === "Renter") {
      $http
        .patch(SERVER.url + '/api/renters/' + id, $scope.user)
        .then(function(resp) {
          $scope.user = resp.data;
          console.log(resp.data)

        })
    } else if ($scope.userType === "Agent"){
      $http
        .patch(SERVER.url + '/api/agents/' + id, $scope.user)
        .then(function(resp) {
          $scope.user = resp.data;
          console.log(resp.data)
        })
    }
  }
  $scope.getUser();

})

