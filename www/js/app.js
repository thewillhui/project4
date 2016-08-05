// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('simplyHome', ['ionic', 'simplyHome.controllers', 'simplyHome.services',  'ng-token-auth', 'ipCookie', 'ngFileUpload'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $authProvider.configure([{
    renter: {
      apiUrl: 'http://localhost:3000',
      tokenValidationPath: '/renter/validate_token',
      signOutUrl: '/renter/sign_out',
      emailRegistrationPath: '/renter',
      accountUpdatePath: '/renter',
      accountDeletePath: '/renter',
      passwordResetPath: '/renter/password',
      passwordUpdatePath: '/renter/password',
      emailSignInPath: '/renter/sign_in',
      storage: 'localStorage',
      validateOnPageLoad: true
    }
  }, {
    agent: {
      apiUrl: 'http://localhost:3000',
      tokenValidationPath: '/agent/validate_token',
      signOutUrl: '/agent/sign_out',
      emailRegistrationPath: '/agent',
      accountUpdatePath: '/agent',
      accountDeletePath: '/agent',
      passwordResetPath: '/agent/password',
      passwordUpdatePath: '/agent/password',
      emailSignInPath: '/agent/sign_in',
      storage: 'localStorage',
      validateOnPageLoad: true
    }
  }]);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab-a', {
    url: '/agent',
    abstract: true,
    templateUrl: 'templates/tabs-agent/tabs.html'
  })

  //////////////////////////////////////////////////////////

  .state('tab-a.testrenter', {
    url: '/renter',
    views: {
      'tab-testRenter': {
        templateUrl: 'templates/test/test-renter-signup.html',
        controller: 'RenterAuthCtrl'
      }
    }
  })

  .state('tab-a.testagent', {
    url: '/agent',
    views: {
      'tab-testAgent': {
        templateUrl: 'templates/test/test-agent-signup.html',
        controller: 'AgentAuthCtrl'
      }
    }
  })

  .state('tab-a.testrenterLogin', {
    url: '/renterLogin',
    views: {
      'tab-testRenterLogin': {
        templateUrl: 'templates/test/test-renter-login.html',
        controller: 'RenterAuthCtrl'
      }
    }
  })

  .state('tab-a.testagentLogin', {
    url: '/agentLogin',
    views: {
      'tab-testAgentLogin': {
        templateUrl: 'templates/test/test-agent-login.html',
        controller: 'AgentAuthCtrl'
      }
    }
  })

  //////////////////////////////////////////////////////////

  // Each tab has its own nav history stack:

  .state('tab.renter-enquiry', {
    url: '/enquiry',
    abstract: true,
    views: {
      'tab-renter-enquiry': {
        templateUrl: 'templates/tabs-renter/enquiry.html',
        controller: 'EnquiryCtrl'
      }
    }
  })


  .state('tab-a.agent-newlisting', {
    url: '/newlisting',
    views: {
      'tab-newlisting': {
        templateUrl: 'templates/tabs-agent/tab-new.html',
        controller: 'NewCtrl'
      }
    }
  })

  .state('tab.renter-enquiry.location', {
    url: '/location',
    templateUrl: 'templates/tabs-renter/tab-enquiry.html'
  })

  .state('tab.renter-enquiry.criteria', {
    url: '/criteria',
    templateUrl: 'templates/tabs-renter/tab-enquiry-criteria.html'
  })

//only show if not logged in
  .state('tab.renter-signup', {
    url: '/renter-signup',
    views: {
      'tab-renter-signup': {
        templateUrl: 'templates/tabs-renter/tab-signup.html',
        controller: 'RenterAuthCtrl'
      }
    }
  })

  .state('tab.renter-my-enquiries', {
    url: '/renter-myenquiries',
    views: {
      'tab-renter-my-enquiries': {
        templateUrl: 'templates/tabs-renter/tab-my-enquiries.html',
        controller: 'RenterMyEnquiriesCtrl'
          }
        }
      })

  .state('tab-a.agent-listings', {
    url: '/listings',
    views: {
      'tab-listings': {
        templateUrl: 'templates/tabs-agent/tab-listings.html',
        controller: 'ListingsCtrl'
      }
    }
  })

  .state('tab-a.agent-appointments', {
    url: '/appointments',
    views: {
      'tab-appointments': {
        templateUrl: 'templates/tabs-agent/tab-appointments.html',
        controller: 'AppointmentsCtrl'
      }
    }
  })

  .state('tab-a.agent-enquiries', {
    url: '/enquiries',
    views: {
      'tab-enquiries': {
        templateUrl: 'templates/tabs-agent/tab-enquiries.html',
        controller: 'EnquiriesCtrl'
      }
    }
  })

  .state('tab-a.agent-chats', {
      url: '/chats',
      views: {
        'tab-agent-chats': {
          templateUrl: 'templates/tabs-agent/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    // .state('tab-a.agent-chat-detail', {
    //   url: '/chats/:chatId',
    //   views: {
    //     'tab-agent-chats': {
    //       templateUrl: 'templates/chat-detail.html',
    //       controller: 'ChatDetailCtrl'
    //     }
    //   }
    // })

  .state('tab.renter-chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tabs-renter/tab-chats.html',
        controller: 'RenterChatsCtrl'
      }
    }
  })

  .state('tab.renter-chat-detail', {
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tabs-renter/chat-detail.html',
        controller: 'RenterChatDetailCtrl'
      }
    }
  })

  .state('tab.renter-chat-detail-listings', {
    url: '/chats/:chatId/listings',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tabs-renter/chat-listings.html',
        controller: 'RenterChatListingsCtrl'
      }
    }
  })


  .state('tab.renter-account', {
    url: '/account',
    views: {
      'tab-renter-account': {
        templateUrl: 'templates/tabs-renter/tab-account.html',
      }
    }
  })

  .state('tab-a.agent-account', {
    url: '/account',
    views: {
      'tab-agent-account': {
        templateUrl: 'templates/tabs-agent/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback

  // $urlRouterProvider.otherwise('/renter/enquiry/location');
 $urlRouterProvider.otherwise('/agent/newlisting');
})