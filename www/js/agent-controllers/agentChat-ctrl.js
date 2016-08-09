app.controller('AgentChatCtrl', function(chat, $http, $scope, $ionicModal, currentEnquiry, $rootScope, SERVER) {

  $scope.message = '';
  $scope.chatroom = chat.getProperty().chatroom;
  $scope.chatroomId = $scope.chatroom.id
  $scope.messages = chat.getProperty().messages;
  $scope.message_html = [];
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
  $scope.currentUser = {};
  $scope.title = '';
  $scope.propertyListing = {
    renter_id: $scope.chatroom.renter_id,
    chat_id: $scope.chatroomId,
    title: '',
    apartments: []
  }
  $scope.listings = [];

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

  // Appointment Modal
  $ionicModal.fromTemplateUrl('templates/tabs-agent/appointment-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.appointmentModal = modal;
  })
  $scope.appointmentOpenModal = function(){
    $scope.appointmentModal.show();
  }

  // Listing Modal
  $ionicModal.fromTemplateUrl('templates/tabs-agent/listing-modal.html', {
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
    $scope.start_time = JSON.stringify($scope.start_time);
    $scope.start_date = JSON.stringify($scope.start_date);
    $scope.end_time = JSON.stringify($scope.end_time);
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
      .get('http://localhost:3000/api/userinfo')
      .then(function(resp){
        $scope.currentUser = resp.data
        console.log('this is after get');
        console.log($scope.currentUser)
      })
  }

  var translateToHtml = function(){
    console.log($scope.messages);
    getCurrentUser();
  }

  translateToHtml();

  getApartments();
})