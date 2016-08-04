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

.controller('EnquiryCtrl', function($scope, $state, $http) {

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

  //if an area is selected the function checks if it's in the enquiry object, if it is then remove it if not then add it. mimicks the checkbox functionality
  $scope.addAreaKey = function(area){
    var areaArr = $scope.enquiry.areas;
    var areaIndex = areaArr.indexOf(area);
    if (areaIndex>=0){
      areaArr.splice(areaIndex,1);
    } else {
      areaArr.push(area);
    }
  };

// New Listings controllers
.controller('NewCtrl', ['Upload','$scope', function(Upload, $scope, $state, $http){
  $scope.upload = function(files){
    console.log(files)
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      Upload.upload({
        url: 'http://localhost:3000/api/apartment_pictures',  //backend url goes
        method: 'POST',
        fields: {
          user_id: currentUserId
        },
        file: file,
        fileFormDataName: 'user_file[image]'
      });
    }
  };
  $scope.petList = [
    { text: "Pets", checked: false }
  ];
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
  $scope.newListing = {
    bedroom_num: '',
    bathroom_num: '',
  };

  $scope.createListings = function() {
    console.log($scope)
    $http({
      method: 'Post',
      url: 'http://localhost:3000/api/apartments', //backend api goes here.
      data: {
        building: $scope.newListing.building,
        street: $scope.newListing.street,
        area: $scope.newListing.area,
        price: $scope.newListing.price,
        gross: $scope.newListing.gross,
        net: $scope.newListing.net,
        buildingtype: $scope.btype
      }
    }).then(function(resp){
      console.log(resp);
    }, function(resp){
      console.log(resp);
    })
  }

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
  //  $scope.sendEnquiry = function(){
  //     console.log($scope.enquiry)
  //     $http
  //       .post('/listings', $scope.newlisting)
  //       .then(function(resp){
  //         console.log(resp.status);
  //         console.log(resp.data);
  // }
}])


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


  $scope.sendEnquiry = function(){
    parseDate();
    parseTime();
    $http
      .post('http://localhost:3000/api/enquiries', $scope.enquiry)
      .then(function(resp){
        console.log(resp.status);
        console.log(resp.data);
      })
  }


.controller('RenterMyEnquiriesCtrl', function($scope, $http, $ionicScrollDelegate) {

  $scope.getEnquiries = function(){
    $http
      .get('http://localhost:3000/api/enquiries')
      .then(function(resp){
        $scope.myEnquiries = resp.data;
      })
  };
    $scope.getEnquiries();

  $scope.dateTime = '';
  var dateTime = $scope.dateTime;

  $scope.parseDateTime = function(dateTime){
   return moment(dateTime).fromNow();
  };

  $scope.scrollResize = function (){
    $ionicScrollDelegate.resize();
  };
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
})

.controller('RenterChatsCtrl', ['$scope', '$http', 'Chats', function($scope, $http, Chats) {
  // For front end
  $scope.chats = Chats.all;
  console.log($scope.chats);
  // // For back-end testing
  // $scope.chatsApi = {
  //   getChats: function () {
  //     $scope.chats = Chats.all;
  //     // $http ({
  //     //   url: 'http://localhost:3000/api/chats',
  //     //   method: 'get'
  //     // }).then(function (resp) {
  //     //   console.log(resp.data)
  //     //   // $scope.chats = resp.data.chats;
  //     // })
  //   },
  //   init: function () {
  //     this.getChats();
  //   }
  // }
  // $scope.chatsApi.init();
}])

.controller('RenterChatDetailCtrl', ['$scope', '$http', '$stateParams', '$ionicScrollDelegate', 'Chats', 'Messages', 'Listings', function($scope, $http, $stateParams, $ionicScrollDelegate, Chats, Messages, Listings) {
  // var ctrlInit = function (){
    $scope.messages = {};
    $scope.listings = {};
  // }

  // For front-end testing
  $scope.messages = Messages.all();
  $scope.chat = Chats.get($stateParams.chatId);

  // For front-end testing
  $scope.sendMessage = function(msg) {
    var message = {
      chat_id: $stateParams.chatId,
      body: $scope.input.message,
      date: new Date(),
      renter_id: 24 /* got to sort out this param to renter name as well*/
    }
    $scope.messages.push(message);
    $ionicScrollDelegate.scrollBottom();
    // ctrlInit();
  }

  // // messages api
  // $scope.messagesApi = {
  //   getMessages: function () {
  //     console.log('getmessages')
  //     $http ({
  //       url: 'http://localhost:3000/api/chats',
  //       method: 'get'
  //     }).then(function (resp) {
  //       $scope.messages = resp.data.messages;
  //     })
  //   },
  //   createMessage: function () {
  //     console.log('sendmessage')
  //     $http({
  //       url: 'http://localhost:3000/api/chats/create',
  //       method: 'post',
  //       data: $scope.input
  //     }).then(function (res) {
  //       console.log(res);
  // //      $scope.messages.push(res.data.input);
  //     })
  //   },
  //   init: function () {
  //     this.getMessages();
  //   }
  // };
  // ctrlInit();
  // $scope.messagesApi.init();
}])

.controller('RenterChatListingsCtrl', ['$scope', 'Agents', 'Listings', function($scope, Agents, Listings) {
  $scope.agents = {};
  $scope.listings = Listings.all;

  // // listings api
  // $scope.listingsApi = {
  //   getListings: function () {
  //     console.log('getlistings')
  //     $http({
  //       url: 'http://localhost:3000/listings',
  //       method: 'get'
  //     }).then(function (resp) {
  //        console.log(resp)
  // //      $scope.listings = resp.data.listings;
  //     })
  //   },
  //   init: function () {
  //     this.getListings();
  //   }
  // };
  // // ctrlInit();
  // $scope.listingsApi.init();
}]);
