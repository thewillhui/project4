app.controller('AgentChatCtrl', function(chat, $http, $scope, $ionicModal, currentEnquiry, $rootScope) {
  // $scope.enquiry = currentEnquiry.getProperty();
  $scope.message = '';
  $scope.chatroom = chat.getProperty().chatroom;
  $scope.chatroomId = $scope.chatroom.id
  $scope.messages = chat.getProperty().messages;
  $scope.apartments = [];
  $scope.appointment = {
    start_date: new Date(),
    start_time: new Date(),
    end_time: new Date(),
    location: '',
    chat_id: $scope.chatroomId,
    renter_id: $scope.chatroom.renter_id
  }
  $scope.enquiries = [];

  // Property Modal
  $ionicModal.fromTemplateUrl('templates/tabs-agent/property-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.propertyModal = modal;
  })
  $scope.propertyOpenModal = function(){
    $scope.propertyModal.show();
  }
  $ionicModal.fromTemplateUrl('templates/tabs-agent/appointment-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.appointmentModal = modal;
  })
  $scope.appointmentOpenModal = function(){
    $scope.appointmentModal.show();
  }

  var getApartments = function(){
    $http
      .get('http://localhost:3000/api/apartments/enquiry/' + $scope.chatroom.renter_id)
      .then(function(data){
        // console.log(data.data.enquiries);
        // console.log(data.data.apartments);
        $scope.apartments = data.data.apartments;
        $scope.enquiries = data.data.enquiries;
        console.log($scope.apartments);
        console.log($scope.enquiries);
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
      }
    }
  );

  $scope.sendAppointment = function(date){
    $scope.appointmentModal.hide();
    console.log($scope.appointment);
    $http
      .post('http://localhost:3000/api/appointments', $scope.appointment)
      .then(function(resp){
        console.log('success:');
        console.log(resp);
      })
  }

  $scope.sendApartments = function(){
    $scope.propertyModal.hide();
    var selectedApartments = [];
    $scope.apartments.forEach(function(apartment){
      if (apartment.checked == true){
        selectedApartments.push(apartment.id);
      }
    })
    var propertyListing = {
      apartments: selectedApartments,
      renter_id: $scope.chatroom.renter_id,
      chat_id: $scope.chatroomId
    }
    $http
      .post('http://localhost:3000/api/property_listings',propertyListing)
      .then(function(data){
        console.log(data.data.message);
      })
  }

  // event listener for send message
  $scope.sendMessage = function(){
    console.log('sendMessage function');
    if($scope.message.length>1){
      App.global_chat.send_message($scope.message);
      $scope.message = '';
    }
  }

  getApartments();
})