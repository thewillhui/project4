app.controller('AgentChatsCtrl', ['$scope', '$http', 'chat', '$state', 'SERVER', 'chats', '$ionicScrollDelegate', function($scope, $http, chat, $state, SERVER, chats, $ionicScrollDeletegate) {
  $scope.chats = [];
  var emptyChats = [];
  var chat_page = false;
  var chats_page = true;

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
  var sortChatrooms = function(arr){
    var emptyChats = [];
    var nonEmptyChats = [];
    var completeChats = [];
    nonEmptyChats = arr.filter(function(chat){
      return chat.messages.length > 0;
    })
    emptyChats = arr.filter(function(chat){
      return chat.messages.length == 0;
    })
    nonEmptyChats.sort(function(a,b){
     if (a.messages[a.messages.length-1].updated_at > b.messages[b.messages.length-1].updated_at)
        return -1;
      if (a.messages[a.messages.length-1].updated_at < b.messages[b.messages.length-1].updated_at)
        return 1;
      return 0;
    })
    console.log('this is nonEmptyChats')
    console.log(nonEmptyChats);
    console.log('this is emptyChats')
    console.log(emptyChats);

    completeChats = nonEmptyChats;
    emptyChats.forEach(function(obj){
      completeChats.push(obj);
    })
    return completeChats;
  }

  var getChats = function(cb){
    $http
      .get(SERVER.url + '/api/chats')
      .then(function(resp){
        console.log('this is resp.data');
        console.log(resp.data);
        // console.log(resp.data[0].chat.id)
        // console.log(resp.data[2].messages[resp.data[2].messages.length-1].updated_at);
        $scope.chats = resp.data;
        sortMessages();
        $scope.chats = sortChatrooms($scope.chats);

        // console.log($scope.chats);
        // console.log($scope.chats[2].messages[10].updated_at)
        chats.setChats($scope.chats);
        console.log('this is chats factory');
        // dummy = chats.getChats();
        // console.log(dummy[0].chat)
        console.log(chats.getChats());

        console.log('ready to run subscription');
        console.log('$scope.chats: ');
        console.log($scope.chats);

        cb();

      })
  }
  var subscribeChats = function(){
    $scope.chats.forEach(function(chat){
      console.log('start setting up App Cable: ' + chat.chat.id);
      console.log(chat.chat.id)
      App.cable.subscriptions.create(
      {
        channel: "ChatRoomsChannel",
        chat_room_id: chat.chat.id
      },
      {
        connected: function(){},
        disconnected: function(){},
        received: function(data){
          if (chat_page){
            // console.log('this is the data you are receiving');
            // console.log('inside agentChat ChaT received')
            // console.log(data);
            // chats.updateChats($scope.chatroomId, $scope.messages);
            // $scope.$apply();
            // console.log('this is after setting CHATS factory in chat');
            // console.log(chats.getChats());
            // console.log($scope.messages);
          } else if (chats_page){
          }
        }
      })
    })
  }



  // chats.each, subscribe to a it with chatroom Id
  // received, use message.chat_id, find key of that chat room
  // push newly received message to that chatroom's messages
  // sort Chatroom function
  // $scope.apply

  // var testIndex = function(){
  //   var index = $scope.chats.map(function(chat){
  //     return chat.chat.id;

  //   }).indexOf(4);
  //   console.log('this is index of');
  //   console.log(index);

  //   console.log('this is the chat object you are looking for');
  //   console.log($scope.chats[index].messages)
  // }

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
  //   return chats.chats;
  // }, function(newChats, oldChats){
  //   $scope.chats = sortChatrooms(newChats);
  //   console.log('this is the new chats from watch');
  //   console.log(newChats);
  // })

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

  getChats(subscribeChats);

}])