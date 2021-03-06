app.controller('AgentAuthCtrl', function(currentUser, $scope, $auth, $state, User, $ionicPopup) {
  $scope.registrationForm = {
    areas: [],
    first_name: '',
    family_name: '',
    mobile_number: '',
    password: '',
    password_confirmation: ''
  };
  $scope.loginForm = {};

  $scope.handleRegBtnClick = function() {
    $auth.submitRegistration(
      $scope.registrationForm, {
        config: 'agent'
      }).then(function(resp) {
      console.log('success registration');
      console.log(resp)
      // resp.data
      currentUser.setProperty(resp);
      // console.log('this is from factory:');
      // console.log(currentUser.getProperty());
      User.config_name = "Agent";
      $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Thanks for registering with SimplyHome'
        });
      }
      $scope.showAlert();
      $state.go('tab.agent-enquiries.matched-enquiries')
    }, function(error) {
      $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Oops! Your mobile_number/password is invalid. Please try again.'
        });
      }
      $scope.showAlert();
    }).catch(function(resp) {
      console.log(resp);
    })
  };

  // comment this out when auth.js works
  $scope.handleLoginBtnClick = function() {

    $auth.submitLogin($scope.loginForm, { config: 'agent' })
      .then(function(resp) {
        console.log(resp);
        currentUser.setProperty(resp);
        console.log('this is from factory:');
        console.log(currentUser.getProperty());
        User.config_name = "Agent";
        // handle success response
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Welcome',
          });
        }
        $scope.showAlert();
        $state.go('tab.agent-enquiries.matched-enquiries')
      }, function(error) {
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Oops! Your mobile_number/password is invalid. Please try again.'
          });
        }
        $scope.showAlert();
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
        User.config_name = null;
        // handle success response
      })
      .catch(function(resp) {
        console.log(resp);
        // handle error response
      });
  }

  $scope.region = {
    'Hong Kong Island': ['Aberdeen', 'Admiralty', 'Wan Chai', 'Tin Hau', 'Tai Hang', 'Tai Koo', 'Shau Kei Wan', 'Heng Fa Chuen', 'Sai Wan Ho', 'Quarry Bay', 'North Point', 'Fortress Hill', 'Mid-Levels', 'Island West', 'Island South', 'Chai Wan', 'Shek O', 'Central', 'Sheung Wan', 'Causeway Bay'],
    'Kowloon': ['Yau Tong', 'Lam Tin', 'Tsim Sha Tsui', 'Jordon', 'To Kwa Wan', 'Kowloon City', 'Tai Kok Tsui', 'Olympic', 'Kowloon Station', 'Sham Shui Po', 'Shek Kip Mei', 'San Po Kong', 'Wong Tai Sin', 'Prince Edward', 'Mong Kok', 'Yau Ma Tei', 'Lai Chi Kok', 'Cheung Sha Wan', 'Mei Foo', 'Lai King', 'Kwun Tong', 'Ngau Tau Kok', 'Kowloon Tong', 'Ho Man Tin', 'Yau Yat Tsuen', 'Kowloon Bay', 'Ngau Chi Wan', 'Hung Hom', 'Whampoa', 'Diamond Hill', 'Lok Fu'],
    'New Territories': ['Yuen Long', 'Tin Shui Wai', 'Tuen Mun', 'Tsuen Wan', 'Tai Wo Hau', 'Tsing Yi', 'Tseung Kwan O', 'Tai Po', 'Tai Wo', 'Sha Tin', 'Tai Wai', 'Fo Tan', 'Sham Tseng', 'Sai Kung', 'Clear Water Bay', 'Ma On Shan', 'Kwai Chung', 'Kwai Fong', 'Fan Ling', 'Sheung Shui', 'Tung Chung', 'Ma Wan', 'Discovery Bay', 'Lantau Island', 'Peng Chau', 'Lamma Island', 'Cheung Chau', 'Other Islands']
  }

  //key is from the ng-repeat. each ion-item must have unique directives or the accordion won't work
  $scope.toggleGroup = function(regionName) {
    if ($scope.isGroupShown(regionName)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = regionName;
    }
  };
  $scope.isGroupShown = function(regionName) {
    return $scope.shownGroup === regionName;
  };
  //if an area is selected the function checks if it's in the enquiry object, if it is then remove it if not then add it. mimicks the checkbox functionality
  $scope.addAreaKey = function(area) {
    var areaArr = $scope.registrationForm.areas;
    var areaIndex = areaArr.indexOf(area);
    if (areaIndex >= 0) {
      areaArr.splice(areaIndex, 1);
    } else {
      areaArr.push(area);
    }
  };
})
