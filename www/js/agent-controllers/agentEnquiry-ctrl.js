angular.module('simplyHome.controllers')
.controller('AgentEnquiryCtrl', function($state, chat, $http, $scope, currentEnquiry){

  $scope.enquiry = currentEnquiry.getProperty();
  console.log($scope.enquiry);

  $scope.getChatRoom = function(chatId, enquiryId, renterId){

    if (chatId){
      $http
        .get('http://localhost:3000/api/chats/' + chatId)
        .then(function(data){
          chat.setProperty(data.data.chatroom, data.data.messages);
          $state.go('tab.agent-chat')
        })

    } else {
      $http
        .get('http://localhost:300/api/chats/findChat/' + renterId + '/' + enquiryId)
        .then(function(data){
          chat.setProperty(data.data.chatroom, data.data.messages);
          $state.go('tab.agent-chat')
        })
    }

  }
})