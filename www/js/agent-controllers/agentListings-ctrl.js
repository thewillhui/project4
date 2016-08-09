app.controller('ListingsCtrl',['$scope', '$http', '$state', 'SERVER', function($scope, $http, $state, SERVER){


  $http({
    method: 'GET',
    url: SERVER.url + '/api/apartments',
  }).then(function successCallback(response) {
    console.log(response)
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

}])