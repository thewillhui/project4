angular.module('simplyHome.controllers')
.controller('AgentChatCtrl', function(chat, $http, $scope, $ionicModal, currentEnquiry) {
    $scope.enquiry = currentEnquiry.getProperty();
    $scope.message = '';
    $scope.chatroom = chat.getProperty().chatroom;
    console.log('scope.chatroom:')
    console.log($scope.chatroom);
    $scope.chatroomId = $scope.chatroom.id
    $scope.messages = chat.getProperty().messages;
    console.log('scope.messages');
    console.log($scope.messages);
    $scope.apartments = [];

  // Property Modal
  $ionicModal.fromTemplateUrl('templates/tabs-agent/property-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  })
  $scope.openModal = function(){
    $scope.modal.show();
  }

  var getApartments = function(){
    $http
      .get('http://localhost:3000/api/apartments')
      .then(function(data){
        data.data.forEach(function(apartment){
          $scope.apartments.push(apartment);
          // console.log('inside loop');
          // console.log($scope.apartments[0].area);
        })
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
      },
      send_listing: function(message){
        this.perform('send_listing', {
          message: message,
          chat_room_id: $scope.chatroomId
        })

      }
    }
  );

  $scope.sendApartments = function(){
    $scope.modal.hide();
    var selectedApartments = [];
    $scope.apartments.forEach(function(apartment){
      if (apartment.checked == true){
        selectedApartments.push(apartment.id);
      }
    })
    var propertyListing = {
      apartments: selectedApartments,
      enquiry_id: $scope.enquiry.enquiry.id,
      renter_id: $scope.enquiry.renter.id,
      chat_id: $scope.chatroomId
    }
    $http
      .post('http://localhost:3000/api/property_listings',propertyListing)
      .then(function(data){
        console.log(data.data.message);
        // App.global_chat.send_listing(data.data.message);
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