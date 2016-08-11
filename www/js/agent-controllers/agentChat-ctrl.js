app.controller('AgentChatCtrl', ['chat', 'chats', '$http', '$scope', '$ionicModal', 'currentEnquiry', '$rootScope', 'SERVER', '$ionicScrollDelegate', '$ionicPopover', '$ionicPopover', '$auth', function(chat, chats, $http, $scope, $ionicModal, currentEnquiry, $rootScope, SERVER, $ionicScrollDelegate, $ionicPopover, $auth) {
  // app.controller('RenterChatCtrl', ['$ionicModal', 'chat', '$scope', '$http', 'chats', 'SERVER', '$ionicScrollDeletegate', function($ionicModal, chat, $scope, $http, chats, SERVER, $ionicScrollDeletegate) {

  var chat_page = true;
  var chats_page = false;
  $scope.chatroom = chat.getProperty().chatroom;
  $scope.chatroomId = $scope.chatroom.id;
  $scope.messages = chat.getProperty().messages;
  $scope.agent = chat.getProperty().agent;
  $scope.renter = chat.getProperty().renter;
  $scope.message = '';
  $scope.apartments = [];
  $scope.appointment = {
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
  }).then(function(modal) {
    $scope.propertyModal = modal;
  })
  $scope.propertyOpenModal = function() {
    $scope.propertyModal.show();
  }

  // Appointment Modal
  $ionicModal.fromTemplateUrl('templates/tabs-agent/appointment-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.appointmentModal = modal;
  })
  $scope.appointmentOpenModal = function() {
    $scope.appointmentModal.show();
  }

  // Listing Modal
  $ionicModal.fromTemplateUrl('templates/tabs-agent/listing-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.listingModal = modal;
  })

  $scope.getListings = function(id) {
    $http
      .get(SERVER.url + '/api/getlistings/' + id)
      .then(function(resp) {
        $scope.listings = resp.data;
        // console.log('this is the listings you are getting');
        // console.log($scope.listings);
        $scope.listingModal.show();
      })
  }

  $scope.sendListings = function() {
    $scope.propertyModal.hide();
    var selectedApartments = [];
    $scope.apartments.forEach(function(apartment) {
      if (apartment.checked == true) {
        selectedApartments.push(apartment.id);
      }
    })
    $scope.propertyListing.apartments = selectedApartments;
    // console.log('this is the data you are sending')
    // console.log($scope.propertyListing);
    $http
      .post(SERVER.url + '/api/property_listings', $scope.propertyListing)
      .then(function(data) {
        // console.log('this is success function:')
        // console.log(data);
      })
  }

  var getApartments = function() {
    $http
      .get(SERVER.url + '/api/apartments/enquiry/' + $scope.chatroom.renter_id)
      .then(function(data) {
        $scope.apartments = data.data.apartments;
        $scope.enquiries = data.data.enquiries;
        // console.log($scope.apartments);
        // console.log($scope.enquiries);
      })
  }

  // action cable
  App.global_chat = App.cable.subscriptions.create({
    channel: "ChatRoomsChannel",
    chat_room_id: $scope.chatroomId
  }, {
    connected: function() {
      $ionicScrollDelegate.scrollBottom();
    },
    disconnected: function() {},
    received: function(data) {
      if ($scope.messages[$scope.messages.length - 1].id != data.message.id) {
        $scope.messages.push(data.message);
        sortMessages();
        $ionicScrollDelegate.scrollBottom();
      }
      $scope.$apply();
    },
    send_message: function(message) {
      this.perform('send_message', {
        message: message,
        chat_room_id: $scope.chatroomId,
        uid: $auth.user.uid
      });
      $ionicScrollDelegate.scrollBottom();
    }
  });

  $scope.cancelAppointment = function(index, messageId) {
    $http
      .delete(SERVER.url + '/api/appointments/' + messageId)
      .then(function(resp) {
        console.log(resp);
        $scope.messages[index].appointment_status = 'cancelled';
        console.log($scope.messages[index].appointment_status)
      })
  }

  $scope.sendAppointment = function(date) {
    $scope.appointmentModal.hide();
    console.log($scope.appointment);
    $http
      .post(SERVER.url + '/api/appointments', $scope.appointment)
      .then(function(resp) {
        console.log(resp);
      })
  }

  $scope.sendMessage = function() {
    // console.log('sendMessage function');
    if ($scope.message.length > 1) {
      App.global_chat.send_message($scope.message);
      $scope.message = '';
    }
  }

  var getCurrentUser = function() {
    $http
      .get(SERVER.url + '/api/userinfo')
      .then(function(resp) {
        $scope.currentUser = resp.data
        console.log('this is after get');
        console.log($scope.currentUser)
      })
  }

  // sort messages by created_at
  var sortMessages = function() {
    $scope.messages.sort(function(a, b) {
      if (a.created_at < b.created_at)
        return -1;
      if (a.created_at > b.created_at)
        return 1;
      return 0;
    })
  }

  $scope.parseTime = function(time) {
      return moment(time).format('HH:mm')
    }

    //popover menu

  var template = '<ion-popover-view class="agentPop"><ion-content><div class="list"><a class="item" ng-click="propertyOpenModal()">Property</a><a class="item" ng-click="appointmentOpenModal()">Appointment</a></div></ion-content></ion-popover-view>'

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });




  getCurrentUser();
  getApartments();
  sortMessages();
  $ionicScrollDelegate.scrollBottom();
}])
