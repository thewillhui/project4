app.controller('RenterChatCtrl', ['chat', '$scope', '$http', 'Chats', function(chat, $scope, $http, Chats) {

  // For front end
  $scope.message = '';
  $scope.chatroom = chat.getProperty().chatroom;
  $scope.messages = chat.getProperty().messages;
  $scope.chatroomId = $scope.chatroom.id

    // action cable
  App.global_chat = App.cable.subscriptions.create(
    {
      channel: "ChatRoomsChannel",
      chat_room_id: $scope.chatroomId
    },
    {
      connected: function() {},
      disconnected: function() {},
      received: function(data) {
        console.log('this is the data you are receiving');
        console.log(data);
        $scope.messages.push(data.message);
        $scope.$apply();
        console.log($scope.messages);
      },
      send_message: function(message) {
        this.perform('send_message', {
          message: message,
          chat_room_id: $scope.chatroomId
        });
      },
      send_listing: function(message){
        this.perform('send_listing', {
          message: message,
          chat_room_id: $scope.chatroomId
        })

      }
    }
  );

  $scope.sendMessage = function(){
    console.log($scope.message);
    console.log('inside sendmessage');
    if($scope.message.length>1){
      App.global_chat.send_message($scope.message);
      $scope.message = '';
    }
  }
}])