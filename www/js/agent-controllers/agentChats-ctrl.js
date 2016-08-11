app.controller('AgentChatsCtrl', ['$scope', '$http', 'chat', '$state', 'SERVER', '$ionicScrollDelegate', function($scope, $http, chat, $state, SERVER, $ionicScrollDeletegate) {
  $scope.chats = [];
  var emptyChats = [];
  var chat_page = false;
  var chats_page = true;
  var channels = [];

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
    // console.log('this is nonEmptyChats')
    // console.log(nonEmptyChats);
    // console.log('this is emptyChats')
    // console.log(emptyChats);

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
        // console.log('this is resp.data');
        // console.log(resp.data);
        // console.log(resp.data[0].chat.id)
        // console.log(resp.data[2].messages[resp.data[2].messages.length-1].updated_at);
        $scope.chats = resp.data;
        sortMessages();
        $scope.chats = sortChatrooms($scope.chats);

        // console.log($scope.chats);
        // console.log($scope.chats[2].messages[10].updated_at)
        // chats.setChats($scope.chats);
        // console.log('this is chats factory');
        // dummy = chats.getChats();
        // console.log(dummy[0].chat)
        // console.log(chats.getChats());

        // console.log('ready to run subscription');
        // console.log('$scope.chats: ');
        // console.log($scope.chats);

        cb();

      })
  }
  var subscribeChats = function(){
    $scope.chats.forEach(function(chat){
      // console.log('start setting up App Cable: ' + chat.chat.id);
      // console.log(chat.chat.id)
      channels.push(App.cable.subscriptions.create(
        {
          channel: "ChatRoomsChannel",
          chat_room_id: chat.chat.id
        },
        {
          connected: function(){},
          disconnected: function(){
            this.perform('unsubscribed');
          },
          received: function(data){
            var index = $scope.chats.map(function(chat){
              return chat.chat.id;
            }).indexOf(data.message.chat_id);
            $scope.chats[index].messages.push(data.message);
            $scope.chats = sortChatrooms($scope.chats);
            $scope.$apply();
          }
        })
      )
    })
  }

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
    // channels.forEach(function(channel){
    //   channel.disconnected();
    // })
    $state.go('tab.agent-chat');
  }

  getChats(subscribeChats);

}])