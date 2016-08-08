app.controller('RenterChatsCtrl', ['$scope', '$http', 'chat', '$state', 'SERVER', function($scope, $http, chat, $state, SERVER) {
  $scope.chats = [];

  var getChats = function(){
    $http
      .get(SERVER.url + '/api/chats')
      .then(function(resp){
        console.log(resp);
        $scope.chats = resp.data;
      })
  }

  $scope.getChat = function(key){
    chat.setProperty($scope.chats[key].chat, $scope.chats[key].messages)
    console.log(chat.getProperty())
    $state.go('tab.renter-chat');

  }

  getChats();
}])