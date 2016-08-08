// New Listings controllers
app.controller('NewCtrl', ['Upload','$scope', "$state", "$http", function(Upload, $scope, $state, $http){

  $scope.files = ''
 var files = $scope.files;
  $scope.upload = function(files){

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
    apt_name: "",
    street:"",
    area: "",
    price: "",
    property_size_gross: "",
    property_size_net: "",
    description: "",
    building_type: "",
    pet_friendly: "",
    bedroom_num: '',
    bathroom_num: ''
  }

  $scope.createListings = function() {
    console.log($scope)
    $http({
      method: 'Post',
      url: 'http://localhost:3000/api/apartments', //backend api goes here.
      data: $scope.newListing
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
}])