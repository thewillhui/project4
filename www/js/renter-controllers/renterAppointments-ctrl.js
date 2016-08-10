angular.module('simplyHome.controllers')
.controller('RenterAppointmentsCtrl', function($http, $scope, SERVER, $ionicModal){
  $scope.appointments = [];
  $scope.agent_ratings = {};
  $scope.currentRating = '';

  $scope.agent_ratings = {
    ar_overall_start: '',
    ar_comment: ''
  }

   // Rating Modal
  $ionicModal.fromTemplateUrl('templates/tabs-renter/rating-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.ratingModal = modal;
  })
  // $scope.propertyOpenModal = function(){
  //   $scope.propertyModal.show();
  // }

  // Rate history Modal
  $ionicModal.fromTemplateUrl('templates/tabs-renter/rate-history-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.rateHistModal = modal;
  })

  $scope.sendRating = function(){
    var id = $scope.currentRating.agent_rating.id;
    console.log(id)

    console.log($scope.agent_ratings)

    $http
      .put(SERVER.url + '/api/agent_ratings/' + id, $scope.agent_ratings)
      .then(function(resp) {
        console.log(resp)
        // $scope.renter_ratings = resp.data;
      }, function (resp) {
        console.log(resp)
      });

    // $scope.showAlert = function() {
    //   var alertPopup = $ionicPopup.alert({
    //     title: 'Review completed',
    //     template: 'Thank you for your input'
    //   });
    // }
    // $scope.showAlert();

  }

  $scope.enterRating = function(key, akey){
    $scope.ratingModal.show();
    $scope.currentRating = $scope.appointments[key][akey];
  }

  $scope.cancelRating = function(key, akey){
    $scope.ratingModal.hide();
  }

  $scope.showRating = function(key, akey){
    $scope.rateHistModal.show();
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

})