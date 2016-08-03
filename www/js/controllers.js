angular.module('simplyHome.controllers', [])

.controller('AgentAuthCtrl', function($scope, $auth) {

  $scope.handleRegBtnClick = function(){

    $auth.submitRegistration({
      email: $scope.registrationForm.email,
      password: $scope.registrationForm.password,
      password_confirmation: $scope.registrationForm. password_confirmation
      }, {
        config: 'agent'
      }).then(function(resp){
      console.log(resp);
    }).catch(function(resp){
      console.log(resp);
    })
  };

  $scope.handleLoginBtnClick = function() {

    $auth.submitLogin($scope.loginForm, { config: 'agent' } )
      .then(function(resp) {
        console.log(resp);
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

.controller('RenterAuthCtrl', function($scope, $auth) {

  $scope.handleRegBtnClick = function(){

    $auth.submitRegistration({
      email: $scope.registrationForm.email,
      password: $scope.registrationForm.password,
      password_confirmation: $scope.registrationForm. password_confirmation
      }, {
        config: 'renter'
      }).then(function(resp){
      console.log(resp);
    }).catch(function(resp){
      console.log(resp);
    })
  };

  $scope.handleLoginBtnClick = function() {

    $auth.submitLogin($scope.loginForm,{config: 'renter'})
      .then(function(resp) {
        console.log(resp);
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
  };
})

.controller('SearchCtrl', function($scope, HkIsland, Kowloon, NewTerritories) {


  $scope.bedroomsBtns = [
    { number: '1' },
    { number: '2' },
    { number: '3' },
    { number: '4' },
    { number: '5+' }
  ]

  $scope.bathroomsBtns = [
    {number: 'Any'},
    {number: '1'},
    {number: '2'},
    {number: '3+'}
  ]

  $scope.region = {
      'Hong Kong Island':
      ['Aberdeen', 'Wan Chai', 'Tin Hau', 'Tai Hang', 'Tai Koo', 'Shau Kei Wan', 'Heng Fa Chuen', 'Sai Wan Ho', 'Quarry Bay', 'North Point', 'Fortress Hill', 'Mid-Levels', 'Island West', 'Island South', 'Chai Wan', 'Shek O', 'Central', 'Sheung Wan', 'Causeway Bay'],
      'Kowloon':
      ['Yau Tong', 'Lam Tin', 'Tsim Sha Tsui', 'Jordon', 'To Kwa Wan', 'Kowloon City', 'Tai Kok Tsui', 'Olympic', 'Kowloon Station', 'Sham Shui Po', 'Shek Kip Mei', 'San Po Kong', 'Wong Tai Sin', 'Prince Edward', 'Mong Kok', 'Yau Ma Tei', 'Lai Chi Kok', 'Cheung Sha Wan', 'Mei Foo', 'Lai King', 'Kwun Tong', 'Ngau Tau Kok', 'Kowloon Tong', 'Ho Man Tin', 'Yau Yat Tsuen', 'Kowloon Bay', 'Ngau Chi Wan', 'Hung Hom', 'Whampoa', 'Diamond Hill', 'Lok Fu'],
      'New Territories':
      ['Yuen Long', 'Tin Shui Wai', 'Tuen Mun', 'Tsuen Wan', 'Tai Wo Hau', 'Tsing Yi', 'Tseung Kwan O', 'Tai Po', 'Tai Wo', 'Sha Tin', 'Tai Wai', 'Fo Tan', 'Sham Tseng', 'Sai Kung', 'Clear Water Bay', 'Ma On Shan', 'Kwai Chung', 'Kwai Fong', 'Fan Ling', 'Sheung Shui', 'Tung Chung', 'Ma Wan', 'Discovery Bay', 'Lantau Island', 'Peng Chau', 'Lamma Island', 'Cheung Chau', 'Other Islands']
    }

  $scope.enquiry = {
    region: {
      'Hong Kong Island': [],
      'Kowloon': [],
      'New Territories': []
    },
    bedroom_num: '',
    bathroom_num: '',
    price_min: 0,
    price_max: 0,
    property_size_net_min: 0,
    property_size_net_max: 0,
    availability: {}
  };

  $scope.date = {};
  $scope.time = {};


//only need to parse when sending to the backend -- fix later
  var parseDate = function(){
    for (var date in $scope.date) {
      var parsedDate = moment(date).format("DD/MM/YYYY");
      $scope.enquiry.availability = parsedDate;
    }
  }

  var parseTime = function(){
    for (var time in $scope.time) {
      var parsedTime = moment(time).format("hh:mm a");
      $scope.enquiry.availability = parsedTime;
    }
  }

//adds/removes the selected area according to the region
  $scope.addAreaKey = function(area,regionName){
    var region = regionName;
    var regionObj = $scope.enquiry.region;
    var regionObjArr = regionObj[regionName];
    var areaIndex = regionObjArr.indexOf(area);
    if (areaIndex>=0){
      regionObjArr.splice(areaIndex,1);
    } else {
      regionObjArr.push(area);
    }
  };


//for making the buttons in button bar act like radio buttons
  $scope.active = '';
  $scope.setActive = function(type) {
    $scope.active = type;
  };
  $scope.isActive = function(type) {
    return type === $scope.active;
  };

  $scope.activeB = '';
  $scope.setActiveB = function(typeB) {
    $scope.activeB = typeB;
  };
  $scope.isActiveB = function(typeB) {
    return typeB === $scope.activeB;
  };


  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */

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


  var sendEnquiry = function(){
    parseDate();
    parseTime();
    $http
      .post('/api/renters/enquiries', $scope.enquiry)
      .then(function(resp){
        console.log(resp);
      })
  }



})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('RenterCtrl', function($scope, $auth){
  $scope.handleRegBtnClick = function(){
    $auth.submitRegistration($scope.registrationForm).then(function(resp){
      console.log(resp);
    }).catch(function(resp){
      console.log(resp);
    })
  };
  $scope.handleLoginBtnClick = function() {
    $auth.submitLogin($scope.loginForm)
      .then(function(resp) {
        console.log(resp);
        // handle success response
      })
      .catch(function(resp) {
        console.log(resp);
        // handle error response
      });
    };
})

.controller('AgentCtrl', function($scope, $auth){
  $scope.handleRegBtnClick = function(){
    $auth.submitRegistration($scope.registrationForm).then(function(resp){
      console.log(resp);
    }).catch(function(resp){
      console.log(resp);
    })
  };

  $scope.handleLoginBtnClick = function() {
    $auth.submitLogin($scope.loginForm)
      .then(function(resp) {
        console.log(resp);
        // handle success response
      })
      .catch(function(resp) {
        console.log(resp);
        // handle error response
      });
    };
});
