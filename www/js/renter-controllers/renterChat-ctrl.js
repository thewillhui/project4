angular.module('simplyHome.controllers')

.controller('RenterChatsCtrl', ['$scope', '$http', 'Chats', function($scope, $http, Chats) {
  // For front end
  $scope.chats = Chats.all();
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
  //
}])