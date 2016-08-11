app.controller('NewCtrl', ['Upload', '$scope', "$state", "$http", "SERVER", function(Upload, $scope, $state, $http, SERVER) {

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
    { number: '1' },
    { number: '2' },
    { number: '3' },
    { number: '4+' }
  ]

  $scope.newListing = {
    apt_name: "",
    street: "",
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

  $scope.createListings = function() {
      console.log($scope)

      var data = {
          files: $scope.apartment_pictures.pictures,
          apartment: $scope.newListing
        }
        // $http({
        //   method: 'Post',
        //   url: SERVER.url + '/api/apartments', //backend api goes here.
        //   data: data
        // }).then(function(resp){
        //   console.log(resp);
        // })

      console.log(data)

      Upload.upload({
        url: SERVER.url + '/api/apartments', //backend api goes here.
        method: "POST",
        data: data
      }).then(function(resp) {
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'New listing added'
          });
        }
        $scope.showAlert();
      }, function(error) {
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Oops! Something went wrong, please try again later.'
          });
        }
        $scope.showAlert();
      }, function(evt) {
        console.log(Math.min(100, parseInt(100.0 * evt.loaded / evt.total)))
      });
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
}])