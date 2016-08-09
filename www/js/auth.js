app.controller('LoginAuthCtrl', [ '$scope', '$auth', 'currentUser', '$http', 'currentEnquiry', 'SERVER', function($scope, $auth, currentUser, $http, currentEnquiry, SERVER) {
  $scope.registrationForm = {};
  $scope.loginForm = {};
  $scope.config = '';

  if ($scope.loginForm) {
    $scope.config = 'agent';
  } else {
    $scope.config = 'renter';
  }

  $scope.sendEnquiry = function() {
    $http
      .post(SERVER.url + '/api/enquiries', currentEnquiry.getProperty())
      .then(function(resp) {
        console.log(resp.status);
        console.log(resp.data);
        currentEnquiry.setProperty('');
      })
  }

  $scope.handleLoginBtnClick = function() {
    $auth.submitLogin($scope.loginForm, { config: $scope.config })
      .then(function(resp) {
        console.log(resp);
        currentUser.setProperty(resp);
        console.log('this is from factory:');
        console.log(currentUser.getProperty());

        if ($scope.loginForm && currentEnquiry.getProperty() !== {}) {
        $scope.sendEnquiry();
        }

      })
      .catch(function(resp) {
        console.log(resp);
        // handle error response
      });
  };

  $scope.handleSignOutClick = function() {
    $auth.signOut()
      .then(function(resp) {
        console.log(resp);
        currentUser.setProperty = resp.data
        // handle success response
      })
      .catch(function(resp) {
        console.log(resp);
        // handle error response
      });
  };
}])
