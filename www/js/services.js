angular.module('simplyHome.services', [])

// storing current chat room info
// for passing info across states
.factory('chat', function(){
    var chat = {};
    return {
        setProperty: function(chatroom, messages){
            chat.chatroom = chatroom;
            chat.messages = messages;
        },
        getProperty: function(){
            return chat;
        }
    }
})

// storing current enquiry info
// for passing info across states
.factory('currentEnquiry', function(){
    var currentEnquiry = {};
    return {
        setProperty: function(enquiry){
            currentEnquiry = enquiry;
        },
        getProperty: function(){
            return currentEnquiry;
        }
    }
})

.factory('HkIsland', function() {


  var hkIsland = [
    { district: 'Aberdeen' },
    { district: 'Wan Chai' },
    { district: 'Tin Hau' },
    { district: 'Tai Hang' },
    { district: 'Tai Koo' },
    { district: 'Shau Kei Wan' },
    { district: 'Heng Fa Chuen' },
    { district: 'Sai Wan Ho' },
    { district: 'Quarry Bay' },
    { district: 'North Point' },
    { district: 'Fortress Hill' },
    { district: 'Mid-Levels'},
    { district: 'Island West' },
    { district: 'Island South' },
    { district: 'Chai Wan' },
    { district: 'Shek O' },
    { district: 'Central' },
    { district: 'Sheung Wan' },
    { district: 'Causeway Bay' }
  ]

  return {
    all: function() {
      return hkIsland;
    }
  };
})


// .factory('Kowloon', function() {

//   var kowloon = [
//     { district: 'Yau Tong' },
//     { district: 'Lam Tin' },
//     { district: 'Tsim Sha Tsui' },
//     { district: 'Jordon' },
//     { district: 'To Kwa Wan' },
//     { district: 'Kowloon City' },
//     { district: 'Tai Kok Tsui' },
//     { district: 'Olympic' },
//     { district: 'Kowloon Station' },
//     { district: 'Sham Shui Po' },
//     { district: 'Shek Kip Mei' },
//     { district: 'San Po Kong' },
//     { district: 'Wong Tai Sin' },
//     { district: 'Prince Edward' },
//     { district: 'Mong Kok' },
//     { district: 'Yau Ma Tei' },
//     { district: 'Lai Chi Kok' },
//     { district: 'Cheung Sha Wan' },
//     { district: 'Mei Foo' },
//     { district: 'Lai King' },
//     { district: 'Kwun Tong' },
//     { district: 'Ngau Tau Kok' },
//     { district: 'Kowloon Tong' },
//     { district: 'Ho Man Tin' },
//     { district: 'Yau Yat Tsuen' },
//     { district: 'Kowloon Bay' },
//     { district: 'Ngau Chi Wan' },
//     { district: 'Hung Hom' },
//     { district: 'Whampoa' },
//     { district: 'Diamond Hill' },
//     { district: 'Lok Fu' }
//   ]
//   return {
//     all: function() {
//       return kowloon;
//     }
//   };
// })

// .factory('NewTerritories', function() {

//   var newTerritories = [
//     { district: 'Yuen Long' },
//     { district: 'Tin Shui Wai' },
//     { district: 'Tuen Mun' },
//     { district: 'Tsuen Wan' },
//     { district: 'Tai Wo Hau' },
//     { district: 'Tsing Yi' },
//     { district: 'Tseung Kwan O' },
//     { district: 'Tai Po' },
//     { district: 'Tai Wo' },
//     { district: 'Sha Tin' },
//     { district: 'Tai Wai' },
//     { district: 'Fo Tan' },
//     { district: 'Sham Tseng' },
//     { district: 'Sai Kung' },
//     { district: 'Clear Water Bay' },
//     { district: 'Ma On Shan' },
//     { district: 'Kwai Chung' },
//     { district: 'Kwai Fong' },
//     { district: 'Fan Ling' },
//     { district: 'Sheung Shui' },
//     { district: 'Tung Chung' },
//     { district: 'Ma Wan' },
//     { district: 'Discovery Bay' },
//     { district: 'Lantau Island' },
//     { district: 'Peng Chau' },
//     { district: 'Lamma Island' },
//     { district: 'Cheung Chau' },
//     { district: 'Other Islands' }
//   ]
//   return {
//     all: function() {
//       return newTerritories;
//     }
//   };
// })


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

.factory('Renters', function(){
  var renters = [{
    id: 24,
    name: "Ben Sparrow"
  }];

  return {
    all: function () {
      return renters;
    },
    get: function(renterId) {
      for (var i = 0; i < renters.length; i++) {
        if (renters[i].id === parseInt(renterId)) {
          return renters[i];
        }
      }
      return null;
    }
  }
})

.factory('Agents', function(){
  var agents = [{
    id: 20,
    name: "Jason Bourne"
  }]

  return {
    all: function () {
      return agents;
    },
    get: function(agentId) {
      for (var i = 0; i < agents.length; i++) {
        if (agents[i].id === parseInt(agentId)) {
          return agents[i];
        }
      }
      return null;
    }
  };
})

.factory('Messages', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var messages = [{
    id: 0,
    chat_id: 0,
    renter_id: 24,
    body: 'You on your way?',
    date: "2016.08.03 12:32:21"
  }, {
    id: 1,
    chat_id: 0,
    agent_id: 20,
    body: 'Yes! in 5 mins',
    date: "2016.08.03 12:45:21"
  }, {
    id: 2,
    chat_id: 0,
    renter_id: 24,
    body: 'great! see you there',
    date: "2016.08.03 12:50:21"
  }, {
    id: 3,
    chat_id: 0,
    agent_id: 20,
    body: 'gotcha',
    date: "2016.08.03 12:55:24"
  }];

  return {
    all: function() {
      return messages;
    },
    remove: function(message) {
      messages.splice(messages.indexOf(message), 1);
    },
    get: function(messageId) {
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].id === parseInt(messageId)) {
          return messages[i];
        }
      }
      return null;
    }
  }
})
.factory('Listings', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var listings = [{
    apt_name: 'Island Crest Tower 1',
    street: '8 First Street, Sai Ying Pun, Hong Kong',
    area: 'Sai Ying Pun',
    property_size_gross_max: 1036,
    property_size_net_max: 764,
    price: 38000,
    bedroom_num: '3',
    bathroom_num: '2',
    pet_friendly: true
  }, {
    apt_name: 'Chung King Court',
    street: '83 First Street, Sai Ying Pun, Hong Kong Island',
    area: 'Sai Ying Pun',
    property_size_gross_max: 1477,
    property_size_net_max: 911,
    price: 58000,
    bedroom_num: '1',
    bathroom_num: '1',
    pet_friendly: false
  }];

  return {
    all: function() {
      return listings;
    },
    remove: function(listing) {
      listings.splice(listings.indexOf(listing), 1);
    },
    get: function(listingId) {
      for (var i = 0; i < listings.length; i++) {
        if (listings[i].id === parseInt(listingId)) {
          return listings[i];
        }
      }
      return null;
    }
  }
})
