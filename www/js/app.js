// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('simplyHome', ['ionic', 'simplyHome.controllers', 'simplyHome.services',  'ng-token-auth', 'ipCookie', 'ngFileUpload', 'angularMoment', 'cgNotify', 'ion-datetime-picker', 'ionic.rating'])

app.run(function($ionicPlatform) {
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

.constant('SERVER', {
  // if using local server
  url: 'http://localhost:3000'

  // if using our public heroku server
  // url: 'http://simplyhome-dev-rails.herokuapp.com'
})

.config(function($stateProvider, $urlRouterProvider, $authProvider, SERVER) {
  $authProvider.configure([{
    renter: {
      apiUrl: SERVER.url,
      tokenValidationPath: '/renter/validate_token',
      signOutUrl: '/renter/sign_out',
      emailRegistrationPath: '/renter',
      accountUpdatePath: '/renter',
      accountDeletePath: '/renter',
      passwordResetPath: '/renter/password',
      passwordUpdatePath: '/renter/password',
      emailSignInPath: '/renter/sign_in',
      // storage: 'localStorage',
      validateOnPageLoad: true
    }
  }, {
    agent: {
      apiUrl: SERVER.url,
      tokenValidationPath: '/agent/validate_token',
      signOutUrl: '/agent/sign_out',
      emailRegistrationPath: '/agent',
      accountUpdatePath: '/agent',
      accountDeletePath: '/agent',
      passwordResetPath: '/agent/password',
      passwordUpdatePath: '/agent/password',
      emailSignInPath: '/agent/sign_in',
      // storage: 'localStorage',
      validateOnPageLoad: true
    }
  }]);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
  })

  //////////////////////////////////////////////////////////
  //====================== Renter ========================//
  //////////////////////////////////////////////////////////
  .state('tab.renter-auth', {
    cache: false,
    url: '/renter-auth',
    abstract: true,
    views: {
      'tab-renter-signup': {
        templateUrl: 'templates/tabs-renter/abstract.html',
        controller: 'RenterAuthCtrl'
      }
    }
  })
  .state('tab.renter-auth.signup', {
    cache: false,
    url: '/signup',
    templateUrl: 'templates/tabs-renter/tab-signup.html'
  })
  .state('tab.renter-auth.login', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/tabs-renter/login.html'
  })

  .state('tab.renter-enquiry', {
    cache: false,
    url: '/renter-enquiry',
    abstract: true,
    views: {
      'tab-renter-enquiry': {
        templateUrl: 'templates/tabs-renter/abstract.html',
        controller: 'EnquiryCtrl'
      }
    }
  })

  .state('tab.renter-enquiry.location', {
    cache: false,
    url: '/location',
    templateUrl: 'templates/tabs-renter/tab-enquiry.html'
  })

  .state('tab.renter-enquiry.criteria', {
    cache: false,
    url: '/criteria',
    templateUrl: 'templates/tabs-renter/tab-enquiry-criteria.html'
  })

  .state('tab.renter-chats', {
    cache: false,
    url: '/renter-chats',
    views: {
      'tab-renter-chat': {
        templateUrl: 'templates/tabs-renter/tab-chats.html',
        controller: 'RenterChatsCtrl'
      }
    }
  })
  .state('tab.renter-chat', {
    cache: false,
    url: '/renter-chat',
    views: {
      'tab-renter-chat': {
        templateUrl: 'templates/tabs-renter/tab-chat.html',
        controller: 'RenterChatCtrl'
      }
    }
  })

  .state('tab.renter-my-enquiries', {
    cache: false,
    url: '/renter-myenquiries',
    views: {
      'tab-renter-my-enquiries': {
        templateUrl: 'templates/tabs-renter/tab-my-enquiries.html',
        controller: 'RenterMyEnquiriesCtrl'
      }
    }
  })

  .state('tab.renter-appointments', {
    cache: false,
    url: '/renter-appointments',
    views: {
      'tab-renter-appointments': {
        templateUrl: 'templates/tabs-renter/tab-appointments.html',
        controller: 'RenterAppointmentsCtrl'
      }
    },
    resolve: {
      auth: function($auth, $state) {
        return $auth.validateUser().catch(function(){
          setTimeout(function(){
            $state.go('tab.renter-enquiry.location')
          }, 1)
        });
      }
    }
  })

    .state('tab.renter-account', {
    cache: false,
    url: '/renter-account',
    views: {
      'tab-renter-account': {
        templateUrl: 'templates/tabs-renter/tab-account.html',
        controller: 'RenterAccountCtrl'
      }
    }
  })

  .state('tab.renter-listings', {
    cache: false,
    url: '/renter-listings',
    views: {
      'tab-renter-listings': {
        templateUrl: 'templates/tabs-renter/tab-listings.html',
        controller: 'RenterListingsCtrl'
      }
    }
  })

  .state('tab.renter-ratings', {
    cache: false,
    url: '/renter-ratings',
    views: {
      'tab-renter-ratings': {
        templateUrl: 'templates/tabs-renter/tab-ratings.html',
        controller: 'RenterRatingsCtrl'
      }
    }
  })

  //////////////////////////////////////////////////////////
  //====================== Agent =========================//
  //////////////////////////////////////////////////////////

  .state('tab.agent-newlisting', {
    cache: false,
    url: '/agent-newlisting',
    views: {
      'tab-newlisting': {
        templateUrl: 'templates/tabs-agent/tab-new.html',
        controller: 'NewCtrl'
      }
    }
  })
  .state('tab.agent-auth', {
    cache: false,
    url: '/agent-auth',
    abstract: true,
    views: {
      'tab-agent-signup': {
        templateUrl: 'templates/tabs-agent/abstract.html',
        controller: 'AgentAuthCtrl'
      }
    }
  })
  .state('tab.agent-auth.signup', {
    cache: false,
    url: '/signup',
    templateUrl: 'templates/tabs-agent/tab-signup.html'
  })
  .state('tab.agent-auth.login', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/tabs-agent/login.html'
  })

  .state('tab.agent-enquiries', {
    cache: false,
    abstract: true,
    url: '/agent-enquiries',
    views: {
      'tab-agent-enquiries': {
        templateUrl: 'templates/tabs-renter/abstract.html',
        controller: 'AgentEnquiriesCtrl'
      }
    }
  })
  .state('tab.agent-enquiries.matched-enquiries', {
    cache: false,
    url: '/matched-enquiries',
    templateUrl: 'templates/tabs-agent/tab-enquiries.html',
  })
  .state('tab.agent-enquiries.enquiry-detail', {
    url: '/enquiry-detail',
    templateUrl: 'templates/tabs-agent/tab-enquiry.html',
    controller: 'AgentEnquiryCtrl'
  })

  .state('tab.agent-appointments', {
    cache: false,
    url: '/agent-appointments',
    views: {
      'tab-appointments': {
        templateUrl: 'templates/tabs-agent/tab-appointments.html',
        controller: 'AgentAppointmentsCtrl'
      }
    }
  })

  .state('tab.agent-chats', {
      cache: false,
      url: '/agent-chats',
      views: {
        'tab-agent-chats': {
          templateUrl: 'templates/tabs-agent/tab-chats.html',
          controller: 'AgentChatsCtrl'
        }
      }
    })

  .state('tab.agent-chat', {
    cache: false,
    url: '/agent-chat',
    views: {
      'tab-agent-chats' :{
        templateUrl: 'templates/tabs-agent/tab-chat.html',
        controller: 'AgentChatCtrl'
      }
    }
  })

  .state('tab.agent-ratings', {
    cache: false,
    url: '/agent-ratings',
    views: {
      'tab-agent-ratings': {
        templateUrl: 'templates/tabs-agent/tab-ratings.html',
        controller: 'AgentRatingsCtrl'
      }
    }
  })

  .state('tab.agent-account', {
    cache: false,
    url: '/agent-account',
    views: {
      'tab-agent-account': {
        templateUrl: 'templates/tabs-agent/tab-account.html',
        controller: 'AgentAccountCtrl'
      }
    }
  })

  .state('tab.agent-listings', {
    cache: false,
    url: '/listings',
    views: {
      'tab-listings': {
        templateUrl: 'templates/tabs-agent/tab-listings.html',
        controller: 'ListingsCtrl'
      }
    }
  })

  //////////////////////////////////////////////////////////
  //====================== Test ==========================//
  //////////////////////////////////////////////////////////

  .state('tab.testagent', {
    url: '/testagent',
    views: {
      'tab-testAgent': {
        templateUrl: 'templates/test/test-agent-signup.html',
        controller: 'AgentAuthCtrl'
      }
    }
  })

  .state('tab.testagentLogin', {
    url: '/agentLogin',
    views: {
      'tab-testAgentLogin': {
        templateUrl: 'templates/test/test-agent-login.html',
        controller: 'AgentAuthCtrl'
      }
    }
  })


  // if none of the above states are matched, use this as the fallback

  // $urlRouterProvider.otherwise('/renter/enquiry/location');
 $urlRouterProvider.otherwise('/tab/renter-enquiry/location');
})