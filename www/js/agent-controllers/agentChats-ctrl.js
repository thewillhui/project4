app.controller('AgentChatsCtrl', ['$scope', '$http', 'chat', '$state', 'SERVER', 'chats', function($scope, $http, chat, $state, SERVER, chats) {

  // variables for chats
  $scope.chats = [];
  var emptyChats = [];

  // variables for chat
  $scope.chatroom = {};
  $scope.chatroomId = '';
  $scope.messages = [];
  $scope.message = '';
  $scope.apartments = [];
  $scope.appointment = {
    start_time: new Date(),
    end_time: new Date(),
    location: '',
    chat_id: '',
    renter_id: ''
  };
  $scope.enquiries = [];
  $scope.currentUser = {};
  $scope.title = '';
  $scope.propertyListing = {
    renter_id: '',
    chat_id: '',
    title: '',
    apartments: []
  }
  $scope.listings = [];


  // function for chats
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

  var subscribeChats = function(){
    $scope.chats.forEach(function(chat){
      console.log('start setting up App Cable: ' + chat.chat.id);
      console.log(chat.chat.id)
      App.global_chat = App.cable.subscriptions.create(
      {
        channel: "ChatRoomsChannel",
        chat_room_id: chat.chat.id
      },
      {
        connected: function(){},
        disconnected: function(){},
        received: function(data){
            console.log('this is the data you are receiving');
            console.log('inside agentChat ChaT received')
            console.log(data);
            $scope.messages.push(data.message);
            sortMessages();
            chats.updateChats($scope.chatroomId, $scope.messages);
            $scope.$apply();
            console.log('this is after setting CHATS factory in chat');
            console.log(chats.getChats());
            console.log($scope.messages);
            console.log('inside agentChat Chatsssss received')
            var index = $scope.chats.map(function(chat){
              return chat.chat.id;
            }).indexOf(data.message.chat_id);
            $scope.chats[index].messages.push(data.message);
            $scope.chats = sortChatrooms($scope.chats);
            $scope.apply();
        },
        send_message: function(message) {
          this.perform('send_message', {
            message: message,
            chat_room_id: $scope.chatroomId
          });
        }
      })
    })
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

  // function for chat

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

  $scope.sendListings = function(){
    $scope.propertyModal.hide();
    var selectedApartments = [];
    $scope.apartments.forEach(function(apartment){
      if (apartment.checked == true){
        selectedApartments.push(apartment.id);
      }
    })
    $scope.propertyListing.apartments = selectedApartments;
    console.log('this is the data you are sending')
    console.log($scope.propertyListing);
    $http
      .post(SERVER.url + '/api/property_listings',$scope.propertyListing)
      .then(function(data){
        console.log('this is success function:')
        console.log(data);
      })
  }

  var getApartments = function(){
    $http
      .get(SERVER.url + '/api/apartments/enquiry/' + $scope.chatroom.renter_id)
      .then(function(data){
        $scope.apartments = data.data.apartments;
        $scope.enquiries = data.data.enquiries;
        console.log($scope.apartments);
        console.log($scope.enquiries);
      })
  }

  $scope.cancelAppointment = function(key, messageId){
    $http
      .delete(SERVER.url + '/api/appointments/' + messageId)
      .then(function(resp){
        console.log(resp);
        $scope.messages[key].appointment_status == 'cancelled';
        console.log($scope.messages[key].appointment_status)
      })
  }

  $scope.sendAppointment = function(date){
    $scope.appointmentModal.hide();
    console.log($scope.appointment);
    $http
      .post(SERVER.url + '/api/appointments', $scope.appointment)
      .then(function(resp){
        console.log(resp);
      })
  }

  $scope.sendMessage = function(){
    console.log('sendMessage function');
    if($scope.message.length>1){
      App.global_chat.send_message($scope.message);
      $scope.message = '';
    }
  }

  var getCurrentUser = function(){
    $http
      .get(SERVER.url + '/api/userinfo')
      .then(function(resp){
        $scope.currentUser = resp.data
        console.log('this is after get');
        console.log($scope.currentUser)
      })
  }

  var sortMessagesInChat = function(){
    $scope.messages.sort(function(a, b){
      if (a.created_at < b.created_at)
        return -1;
      if (a.created_at > b.created_at)
        return 1;
      return 0;
    })
  }


  // routing and init

  $scope.getChat = function(key){
    chat.setProperty($scope.chats[key].chat, $scope.chats[key].messages)
    $state.go('tab.agent-chat');
    // variables init
    $scope.chatroom = chat.getProperty().chatroom;
    $scope.chatroomId = $scope.chatroom.id
    $scope.messages = chat.getProperty().messages;
    $scope.appointment = {
      start_time: new Date(),
      end_time: new Date(),
      location: '',
      chat_id: $scope.chatroomId,
      renter_id: $scope.chatroom.renter_id
    }
    $scope.propertyListing = {
      renter_id: $scope.chatroom.renter_id,
      chat_id: $scope.chatroomId,
      title: '',
      apartments: []
    }
    getCurrentUser();
    getApartments();
    sortMessagesInChat();
  }

  getChats(subscribeChats);

}])