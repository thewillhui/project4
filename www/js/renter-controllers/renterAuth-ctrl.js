app.controller('RenterAuthCtrl', function($scope, $auth, currentUser) {
  $scope.registrationForm = {};

  $scope.handleRegBtnClick = function() {

    $auth.submitRegistration({
      salutation: $scope.registrationForm.salutation,
      first_name: $scope.registrationForm.first_name,
      family_name: $scope.registrationForm.family_name,
      mobile_number: $scope.registrationForm.mobile_number,
      password: $scope.registrationForm.password,
      password_confirmation: $scope.registrationForm.password_confirmation
    }, {
      config: 'renter'
    }).then(function(resp) {
      console.log(resp);
      currentUser.setProperty = resp.data

    }).catch(function(resp) {
      console.log(resp);
    })
  };

  $scope.loginForm = {};

  $scope.handleLoginBtnClick = function() {
    $auth.submitLogin($scope.loginForm, { config: 'renter' })
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
})
