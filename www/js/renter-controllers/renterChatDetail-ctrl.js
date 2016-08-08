app.controller('RenterChatDetailCtrl', ['$scope', '$http', '$stateParams', '$ionicScrollDelegate', 'Chats', 'Messages', 'Listings', 'SERVER', function($scope, $http, $stateParams, $ionicScrollDelegate, Chats, Messages, Listings, SERVER) {
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