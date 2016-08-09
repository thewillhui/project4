app.controller('RenterAuthCtrl', ['$scope', '$auth', 'currentUser', '$http', 'currentEnquiry', 'SERVER', 'User', '$ionicPopup', '$state', function($scope, $auth, currentUser, $http, currentEnquiry, SERVER, User, $ionicPopup, $state) {

  $scope.registrationForm = {};
  $scope.loginForm = {};

  $scope.sendEnquiry = function() {
    $http
      .post(SERVER.url + '/api/enquiries', {
        enquiry: currentEnquiry.getProperty()
      })
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
      $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Thanks for registering with SimplyHome',
          template: 'You may now create enquiries.'
        });
      }
      $scope.showAlert();
      $state.go('tab.renter-enquiry.location');

      if (currentEnquiry.getProperty() !== {}) {
        $scope.sendEnquiry();
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Thanks for registering with SimplyHome',
            template: 'Your enquiry has now been sent to relevant agents! You will be notified when matching agents reach out to you.'
          });
        }
        $scope.showAlert();
      }
      User.config_name = "Renter";
    }).catch(function(resp) {
      console.log(resp);
      $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Sorry the mobile number is already registered or your password does not match.'
        });
      }
      $scope.showAlert();
    })
  };

  // comment this out when auth.js works
  $scope.handleLoginBtnClick = function() {
    $auth.submitLogin($scope.loginForm, { config: 'renter' })
      .then(function(resp) {
        console.log(resp);
        User.config_name = "Renter";
        // handle success response
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Welcome',
            template: 'You are now logged in.'
          });
        }
        $scope.showAlert();
        // if (currentEnquiry.getProperty() !== {}) {
        //   $scope.sendEnquiry();
        // }
      })
      .catch(function(resp) {
        console.log(resp);
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Oops! Your mobile_number/password is invalid. Please try again.'
          });
        }
        $scope.showAlert();
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
}])
