app.controller('AgentChatsCtrl', ['$scope', '$http', 'chat', '$state', 'SERVER', function($scope, $http, chat, $state, SERVER) {
  $scope.chats = [];

  var getChats = function(){
    $http
      .get(SERVER.url + '/api/chats')
      .then(function(resp){
        $scope.chats = resp.data;
        console.log('this is $scope.chats')
        console.log($scope.chats)
      })
  }

  $scope.getChat = function(key){
    chat.setProperty($scope.chats[key].chat, $scope.chats[key].messages)
    console.log(chat.getProperty())
    $state.go('tab.agent-chat');
  }

  getChats();
}])