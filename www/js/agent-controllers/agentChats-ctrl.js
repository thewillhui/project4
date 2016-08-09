app.controller('AgentChatsCtrl', ['$scope', '$http', 'chat', '$state', 'SERVER', 'chats', function($scope, $http, chat, $state, SERVER, chats) {
  $scope.chats = [];

  // sort messages
  var sortMessages = function(){
    $scope.chats.forEach(function(chat){
      chat.messages.sort(function(a,b){
        if (a.created_at < b.created_at)
          return -1;
        if (a.created_at > b.created_at)
          return 1;
        return 0;
      })
    })
  }

  // sort chatrooms
  var sortChatrooms = function(){
    $scope.chats.sort(function(a,b){
      if (a.messages[a.messages.length-1].updated_at < b.messages[b.messages.length-1].updated_at)
        return -1;
      if (a.messages[a.messages.length-1].updated_at > b.messages[b.messages.length-1].updated_at)
        return 1;
      return 0;
    })
  }

  var getChats = function(){
    $http
      .get(SERVER.url + '/api/chats')
      .then(function(resp){
        console.log('this is resp.data');
        console.log(resp.data);
        // console.log(resp.data[0].chat.id)
        // console.log(resp.data[2].messages[resp.data[2].messages.length-1].updated_at);
        $scope.chats = resp.data;
        sortMessages();
        sortChatrooms();
        chats.setChats($scope.chats);
        console.log('this is chats factory');
        console.log(chats.getChats());
      })
  }

  // sort messages
  // sort chatroom
  // put all chatrooms inside CHATS factory
  // put all chatrooms inside $scope.chats

  // put the chosen chatroom inside CHAT factory
  // when changed, use chat.id in CHAT to locate changed chatroom in CHATS
  // pass in $scope.messages to the changed chatroom in CHATS
  // $scope.$watch look for changes in CHATS chats
  // if changed, put to $scope.chats, sort chatroom and messages again

  // $scope.$watch(function(){
  //    return MenuFactory.Control;
  // }, function(NewValue, OldValue){
  //     console.log(NewValue + ' ' + OldValue);
  //     console.log(MenuFactory.Control);
  // });

  $scope.getChat = function(key){
    chat.setProperty($scope.chats[key].chat, $scope.chats[key].messages)
    $state.go('tab.agent-chat');
  }

  getChats();
}])