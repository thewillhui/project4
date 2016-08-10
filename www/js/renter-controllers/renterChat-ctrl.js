app.controller('RenterChatCtrl', ['$ionicModal', 'chat', '$scope', '$http', 'chats', 'SERVER', '$ionicScrollDelegate', function($ionicModal, chat, $scope, $http, chats, SERVER, $ionicScrollDelegate) {

  var chat_page = true;
  var chats_page = false;
  // For front end
  $scope.chatroom = chat.getProperty().chatroom;
  $scope.messages = chat.getProperty().messages;
  $scope.message = '';
  $scope.chatroomId = $scope.chatroom.id
  $scope.currentUser = {};

  // Listing Modal
  $ionicModal.fromTemplateUrl('templates/tabs-renter/listing-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.listingModal = modal;
  })

  $scope.getListings = function(id){
    $http
      .get(SERVER.url + '/api/getlistings/' + id)
      .then(function(resp){
        $scope.listings = resp.data;
        console.log('this is the listings you are getting');
        console.log($scope.listings);
        $scope.listingModal.show();
      })
  }

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
        if (chat_page){
          console.log('received, before push');
          console.log($scope.messages);
          $scope.messages.push(data.message);
          console.log('received, after push');
          console.log($scope.messages);
          sortMessages();
          $ionicScrollDelegate.scrollBottom();
          $scope.$apply();
        } else if (chats_page){
            console.log('inside agentChat Chatsssss received')
            var index = $scope.chats.map(function(chat){
              return chat.chat.id;
            }).indexOf(data.message.chat_id);
            $scope.chats[index].messages.push(data.message);
            $scope.chats = sortChatrooms($scope.chats);
            $scope.$apply();
        }
      },
      send_message: function(message) {
        this.perform('send_message', {
          message: message,
          chat_room_id: $scope.chatroomId
        });
      }
    }
  );

  $scope.cancelAppointment = function(key, messageId){
    $http
      .delete(SERVER.url + '/api/appointments/' + messageId)
      .then(function(resp){
        console.log(resp);
        $scope.messages[key].appointment_status == 'cancelled';
        console.log($scope.messages[key].appointment_status)
      })
  }


  $scope.confirmAppointment = function(key, messageId){
    $http
      .put(SERVER.url + '/api/appointments/confirm/' + messageId)
      .then(function(resp){
        $scope.messages[key].appointment_status == 'confirmed'
        console.log(resp);
      })
  }

  $scope.sendMessage = function(){
    console.log($scope.message);
    console.log('inside sendmessage');
    if($scope.message.length>1){
      App.global_chat.send_message($scope.message);
      $scope.message = '';
    }
  }

  var sortMessages = function(){
    $scope.messages.sort(function(a, b){
      if (a.created_at < b.created_at)
        return -1;
      if (a.created_at > b.created_at)
        return 1;
      return 0;
    })
  }

  sortMessages();
  $ionicScrollDelegate.scrollBottom();
  // $scope.$apply();
}])