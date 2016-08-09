app.controller('RenterAuthCtrl', function($scope, $auth, currentUser, $http, currentEnquiry, SERVER, User) {

  $scope.registrationForm = {};
  $scope.loginForm = {};

  $scope.sendEnquiry = function() {
    $http
      .post(SERVER.url + '/api/enquiries', currentEnquiry.getProperty())
      .then(function(resp) {
        console.log(resp.status);
        console.log(resp.data);
        currentEnquiry.setProperty('');
      })
  }

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

      if (currentEnquiry.getProperty() !== {}) {
        $scope.sendEnquiry();
      }
      User.config_name = "Renter";
    }).catch(function(resp) {
      console.log(resp);
    })
  };

  // comment this out when auth.js works
  $scope.handleLoginBtnClick = function() {
    $auth.submitLogin($scope.loginForm, { config: 'renter' })
      .then(function(resp) {
        console.log(resp);
        User.config_name = "Renter";
        // handle success response

        if (currentEnquiry.getProperty() !== {}) {
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
        // handle success response
        User.config_name = null;
      })
      .catch(function(resp) {
        console.log(resp);
        // handle error response
      });
  };
})
