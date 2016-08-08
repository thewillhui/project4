app.controller('AgentChatsCtrl', ['$scope', '$http', 'chat', '$state', function($scope, $http, chat, $state) {
  $scope.chats = [];

  var getChats = function(){
    $http
      .get('http://localhost:3000/api/chats')
      .then(function(resp){
        console.log(resp);
        $scope.chats = resp.data;
      })
  }

  $scope.getChat = function(key){
    chat.setProperty($scope.chats[key].chat, $scope.chats[key].messages)
    console.log(chat.getProperty())
    $state.go('tab.agent-chat');
  }

  getChats();
}])