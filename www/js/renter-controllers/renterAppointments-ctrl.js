angular.module('simplyHome.controllers')
.controller('RenterAppointmentsCtrl', function($http, $scope, SERVER, $ionicModal){
  $scope.appointments = [];
  $scope.renter_ratings = {
    rr_overall_start: '',
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

  }

  $scope.enterRating = function(key, akey){
    $scope.ratingModal.show();
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