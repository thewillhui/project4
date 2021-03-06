angular.module('simplyHome.controllers')
.controller('AgentAppointmentsCtrl', ['$http', '$scope', 'SERVER', '$ionicModal', '$ionicPopup', function($http, $scope, SERVER, $ionicModal, $ionicPopup){
  $scope.appointments = [];
  $scope.renter_ratings = {};
  $scope.currentRating = '';
  $scope.ratings = [];

  $scope.ratings = [
    {number: 1},
    {number: 2},
    {number: 3},
    {number: 4},
    {number: 5}
  ]

  // $scope.confirmAppointments = function(id){
  //   console.log(id);
  //   $http
  //     .put(SERVER.url + '/api/appointments/confirm/' + id)
  //     .then(function(resp){
  //       console.log(resp);
  //       $scope.confirm = "Confirmed"
  //     })

  $scope.renter_ratings = {
    rr_overall_star: '',
    rr_comment: '',
    no_show: false,
    spy: false
  }

   // Rating Modal
  $ionicModal.fromTemplateUrl('templates/tabs-agent/rating-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.ratingModal = modal;
  })
  // $scope.propertyOpenModal = function(){
  //   $scope.propertyModal.show();
  // }

  // Rate history Modal
  $ionicModal.fromTemplateUrl('templates/tabs-agent/rate-history-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.rateHistModal = modal;
  })

  $scope.sendRating = function(){
    var id = $scope.currentRating.renter_rating.id;
    console.log(id)

    console.log($scope.renter_ratings)
    $scope.ratingModal.hide();

    $http
      .put(SERVER.url + '/api/renter_ratings/' + id, $scope.renter_ratings)
      .then(function(resp) {
        console.log(resp)

        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Review completed',
            template: 'Thank you for your input'
          });
        }
        $scope.showAlert();

        $scope.cancelRating();

      }, function (resp) {
        console.log(resp)
      });

  }

  $scope.enterRating = function(key, akey){
    console.log('entering rating')

    $scope.ratingModal.show();
    $scope.currentRating = $scope.appointments[key][akey];
  }

  $scope.cancelRating = function(){
    $scope.ratingModal.hide();
  }

  $scope.showRating = function(key, akey){
    $scope.rateHistModal.show();
    $scope.currentRating = $scope.appointments[key][akey];
  }

  $scope.hideRateHist = function(){
    $scope.rateHistModal.hide();
  }

  var getAppointments = function(){
    $http
      .get(SERVER.url + '/api/appointments')
      .then(function(resp){
        $scope.appointments = resp.data;
        console.log($scope.appointments);
      })
  }
  getAppointments();

  $scope.getNumber = function(num) {
    return new Array(num);
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