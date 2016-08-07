angular.module('simplyHome.controllers')
.controller('AgentAuthCtrl', function(currentUser, $scope, $auth) {

  $scope.handleRegBtnClick = function() {

    $auth.submitRegistration({
      email: $scope.registrationForm.email,
      password: $scope.registrationForm.password,
      password_confirmation: $scope.registrationForm.password_confirmation
    }, {
      config: 'agent'
    }).then(function(resp) {
        currentUser.setProperty(resp);
        console.log('this is from factory:');
        console.log(currentUser.getProperty());
      // console.log(resp);
    }).catch(function(resp) {
      console.log(resp);
    })
  };

  $scope.handleLoginBtnClick = function() {

    $auth.submitLogin($scope.loginForm, { config: 'agent' })
      .then(function(resp) {
        console.log(resp);
        currentUser.setProperty(resp);
        console.log('this is from factory:');
        console.log(currentUser.getProperty());

        // handle success response
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
        // handle success response
      })
      .catch(function(resp) {
        console.log(resp);
        // handle error response
      });
  }
})

