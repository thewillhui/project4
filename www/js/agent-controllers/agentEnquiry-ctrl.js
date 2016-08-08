app.controller('AgentEnquiryCtrl', function($state, chat, $http, $scope, currentEnquiry, SERVER){

  $scope.enquiry = currentEnquiry.getProperty();
  console.log($scope.enquiry);

  $scope.getChatRoom = function(chatId, enquiryId, renterId){
    console.log('hi');
    console.log(SERVER.url);
    console.log(enquiryId, renterId, chatId);

    if (chatId){
      $http
        .get(SERVER.url + '/api/chats/' + chatId)
        .then(function(data){
          chat.setProperty(data.data.chatroom, data.data.messages);
          $state.go('tab.agent-chat')
        })

    } else {
      $http
        .get(SERVER.url + '/api/chats/findChat/' + renterId + '/' + enquiryId)
        .then(function(data){
          chat.setProperty(data.data.chatroom, data.data.messages);
          $state.go('tab.agent-chat')
        })
    }

  }
})