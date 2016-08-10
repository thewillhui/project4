app.controller('ListingsCtrl', function($scope, $http, $state, SERVER, $ionicScrollDelegate){

  $scope.apartment_pictures = {};

  $scope.petList = [
    { text: "Pets", checked: false }
  ];

    $scope.walkUp = [
    { text: "Walk Up", checked: false }
  ];

    $scope.opnKitchen = [
    { text: "Open Kitchen", checked: false }
  ];

  $scope.bedroomsBtns = [
    { number: 'Studio' },
    { number: '1' },
    { number: '2' },
    { number: '3' },
    { number: '4+' }
  ]
  $scope.bathroomsBtns = [
    {number: '1'},
    {number: '2'},
    {number: '3'},
    {number: '4+'}
  ]

  $scope.newListing = {
    apt_name: "",
    street:"",
    area: "",
    price: "",
    property_size_gross: "",
    property_size_net: "",
    description: "",
    pet_friendly: "",
    bedroom_num: '',
    bathroom_num: '',
    walkup: '',
    open_kitchen: ''
  }

  $scope.apartment_id = '';
  $scope.apartment = {};

  $scope.getApartment = function(id){
    console.log(id)
    $scope.apartment_id = id;
    $http
    .get(SERVER.url + '/api/apartments/'+ $scope.apartment_id)
    .then(function(resp) {
      console.log(resp)
      $scope.apartment = angular.copy(resp.data);
    })
  }

  $scope.updateApartment = function(apartment){
    console.log(apartment)
    $http
    .put(SERVER.url + '/api/apartments/' + apartment.id, $scope.apartment)
    .then(function(resp) {
      console.log(resp)
    }, function (resp) {
      console.log(resp)
    })
  }

  // PhotoUpload?
  // $scope.updateListings = function() {
  //   console.log($scope)

  //   var data = {
  //     files: $scope.apartment_pictures.pictures,
  //     apartment: $scope.newListing
  //   }
  //   console.log(data)
  //   id = $scope.apartment_id
  //   Upload.upload({
  //     url: SERVER.url + '/api/apartments/' + id, //backend api goes here.
  //     method: "PUT",
  //     data: data
  //   }).then(function(resp){
  //     console.log(resp);
  //   }, function(resp){
  //     console.log(resp);
  //   }, function(evt){
  //     console.log(Math.min(100, parseInt(100.0 * evt.loaded / evt.total)))
  //   });
  // }


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

  // functions for listings tab

  $scope.changeDisplay = function(listing) {
    var showDetail = listing.showDetail;
    console.log(listing)
    $scope.listings.map(function(x) {
      x.showDetail = false;
      x.limitTo = 3;
    });

    if (showDetail === false) {
      listing.showDetail = !listing.showDetail;
      listing.limitTo = listing.area.length;
    }
};
  $scope.getListings = function() {
    $http
      .get(SERVER.url + '/api/apartments')
      .then(function successCallback(response) {
        $scope.listings = response.data.map(function(x, index) {
          x.index = index + 1;
          x.limitTo = 3;
          x.showDetail = false;
          return x;
          })
        })
        .finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
            })
        };

  $scope.getListings();

  $scope.scrollResize = function() {
    $ionicScrollDelegate.resize();
  };
})