// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('simplyHome', ['ionic', 'simplyHome.controllers', 'simplyHome.services',  'ng-token-auth', 'ipCookie'])
.constant('ApiEndpoint', {
  url: 'http://localhost:8100/api'
})

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
  $authProvider.configure([
      {
      renter: {
        apiUrl:                  'http://localhost:3000',
        tokenValidationPath:     '/renter/validate_token',
        signOutUrl:              '/renter/sign_out',
        emailRegistrationPath:   '/renter',
        accountUpdatePath:       '/renter',
        accountDeletePath:       '/renter',
        passwordResetPath:       '/renter/password',
        passwordUpdatePath:      '/renter/password',
        emailSignInPath:         '/renter/sign_in',
        storage:                 'localStorage',
        validateOnPageLoad: true
      }
    }, {
      agent: {
        apiUrl:                  'http://localhost:3000',
        tokenValidationPath:     '/agent/validate_token',
        signOutUrl:              '/agent/sign_out',
        emailRegistrationPath:   '/agent',
        accountUpdatePath:       '/agent',
        accountDeletePath:       '/agent',
        passwordResetPath:       '/agent/password',
        passwordUpdatePath:      '/agent/password',
        emailSignInPath:         '/agent/sign_in',
        storage:                 'localStorage',
        validateOnPageLoad: true
      }
    }
  ])

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/renter',
    abstract: true,
    templateUrl: 'templates/tabs/tabs.html'
  })

  //////////////////////////////////////////////////////////
  .state('tab.testrenter', {
    url: '/renter',
    views: {
      'tab-testRenter': {
        templateUrl: 'templates/test/test-renter-signup.html',
        controller: 'RenterAuthCtrl'
      }
    }
  })

  .state('tab.testagent', {
    url: '/agent',
    views: {
      'tab-testAgent': {
        templateUrl: 'templates/test/test-agent-signup.html',
        controller: 'AgentAuthCtrl'
      }
    }
  })

  //////////////////////////////////////////////////////////

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tabs/tab-search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tabs/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tabs/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/renter/dash');

});
