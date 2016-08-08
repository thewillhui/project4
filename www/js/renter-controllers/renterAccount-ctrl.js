app.controller('RenterAccountCtrl', function($scope, $http, currentUser, SERVER) {

  $scope.getUser = function() {
    $http
      .get(SERVER.url + '/api/userinfos')
      .then(function(resp) {
        console.log(resp.data)
        $scope.user = resp.data.current_user;
        $scope.userType = resp.data.type;
      })
  };

  $scope.account = {};

  $scope.updateUser = function(user) {

    var id = user.id;

    if ($scope.userType === "Renter") {
      $http
        .put(SERVER.url + '/api/renters/' + id, $scope.account)
        .then(function(resp) {
          $scope.user = resp.data;
        })
    } else if ($scope.userType === "Agent"){
      $http
        .put(SERVER.url + '/api/agents/' + id, $scope.account)
        .then(function(resp) {
          $scope.user = resp.data;
        })
    }
  }

  $scope.getUser();

})
