angular.module('simplyHome.controllers', [])


.controller('AgentAuthCtrl', function($scope, $auth, notify) {

  $auth.submitRegistration({
    email: $scope.registrationForm.email,
    password: $scope.registrationForm.password,
    password_confirmation: $scope.registrationForm. password_confirmation
    }, {
      config: 'agent'
    }).then(function(resp){
      notify('Thanks for your registration!');
      console.log(resp);
    }).catch(function(resp){
      console.log(resp);
      notify({
        message: 'Some error appeared',
        // duration: 1500,
        templateUrl:'lib/angular-notify/angular-notify.html'
      })
    })
  })

// //for making the buttons in button bar act like radio buttons
//   $scope.active = '';
//   $scope.setActive = function(type) {
//     $scope.active = type;
//   };
//   $scope.isActive = function(type) {
//     return type === $scope.active;
//   };

//   $scope.activeB = '';
//   $scope.setActiveB = function(typeB) {
//     $scope.activeB = typeB;
//   };
//   $scope.isActiveB = function(typeB) {
//     return typeB === $scope.activeB;
//   };

//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// }])