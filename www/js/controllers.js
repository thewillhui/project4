angular.module('simplyHome.controllers', [])

.controller('TabsCtrl', function($scope, currentUser, User, $rootScope) {

  $scope.$watchCollection(function(){
    return User;
  }, function(newVal, oldVal){
    var config_name = newVal.config_name;

    if (config_name === "Renter") {
      $scope.renter = true;
      $scope.agent = false;
      $scope.guest = false;
    } else if (config_name === "Agent") {
      $scope.renter = false;
      $scope.agent = true;
      $scope.guest = false;

.controller('AgentAuthCtrl', function($scope, $auth, notify) {

  $auth.submitRegistration({
    email: $scope.registrationForm.email,
    password: $scope.registrationForm.password,
    password_confirmation: $scope.registrationForm. password_confirmation
    }, {
      config: 'agent'
    }).then(function(resp){
      notify('Thanks for your registration!');
      console.log(resp);
    }).catch(function(resp){
      console.log(resp);
      notify({
        message: 'Some error appeared',
        // duration: 1500,
        templateUrl:'lib/angular-notify/angular-notify.html'
      })
      .catch(function(resp) {
        console.log(resp);
        // handle error response
      });
  });

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

.controller('EnquiryCtrl', function($scope, $state, $http, SERVER) {

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
    ['Aberdeen', 'Admiralty', 'Wan Chai', 'Tin Hau', 'Tai Hang', 'Tai Koo', 'Shau Kei Wan', 'Heng Fa Chuen', 'Sai Wan Ho', 'Quarry Bay', 'North Point', 'Fortress Hill', 'Mid-Levels', 'Island West', 'Island South', 'Chai Wan', 'Shek O', 'Central', 'Sheung Wan', 'Causeway Bay'],
    'Kowloon':
    ['Yau Tong', 'Lam Tin', 'Tsim Sha Tsui', 'Jordon', 'To Kwa Wan', 'Kowloon City', 'Tai Kok Tsui', 'Olympic', 'Kowloon Station', 'Sham Shui Po', 'Shek Kip Mei', 'San Po Kong', 'Wong Tai Sin', 'Prince Edward', 'Mong Kok', 'Yau Ma Tei', 'Lai Chi Kok', 'Cheung Sha Wan', 'Mei Foo', 'Lai King', 'Kwun Tong', 'Ngau Tau Kok', 'Kowloon Tong', 'Ho Man Tin', 'Yau Yat Tsuen', 'Kowloon Bay', 'Ngau Chi Wan', 'Hung Hom', 'Whampoa', 'Diamond Hill', 'Lok Fu'],
    'New Territories':
    ['Yuen Long', 'Tin Shui Wai', 'Tuen Mun', 'Tsuen Wan', 'Tai Wo Hau', 'Tsing Yi', 'Tseung Kwan O', 'Tai Po', 'Tai Wo', 'Sha Tin', 'Tai Wai', 'Fo Tan', 'Sham Tseng', 'Sai Kung', 'Clear Water Bay', 'Ma On Shan', 'Kwai Chung', 'Kwai Fong', 'Fan Ling', 'Sheung Shui', 'Tung Chung', 'Ma Wan', 'Discovery Bay', 'Lantau Island', 'Peng Chau', 'Lamma Island', 'Cheung Chau', 'Other Islands']
  }

  $scope.enquiry = {
    areas: [],
    bedroom_num: '',
    bathroom_num: '',
    price_min: 0,
    price_max: 0,
    property_size_min: 0,
    property_size_max: 0,
    movein_date:'',
    urgent: '',
    availability: {},
    remarks: ''
  };

  $scope.date = {};
  $scope.time = {};

  //only need to parse when sending to the backend
  var parseDate = function(){
    var dates = $scope.date;
    for (var date in dates) {
      var parsedDate = moment(dates[date]).format("DD/MM/YYYY");
      $scope.enquiry.availability.date = parsedDate;
    }
  }

  var parseTime = function(){
    var times = $scope.time;
    for (var time in times) {
      var parsedTime = moment(times[time]).format("hh:mm a");
      $scope.enquiry.availability.time = parsedTime;
    }
  }
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */

  //key is from the ng-repeat. each ion-item must have unique directives or the accordion won't work
  $scope.toggleGroup = function(regionName) {
    if ($scope.isGroupShown(regionName)) {
      $scope.shownGroup = null;
    } else {
      $scope.renter = false;
      $scope.agent = false;
      $scope.guest = true;
    }
  });
});