angular.module('simplyHome.services', [])

.factory('chats', function() {
  var factory = {
    chats: [],
    updateChats: function(chatId, messages) {
      // its current index
      console.log('from services.js')
      console.log('chatId')
      console.log(chatId)
      var index = factory.chats.map(function(chat) {
        console.log('chat.chat.id')
        console.log(chat.chat.id);
        return chat.chat.id;
      }).indexOf(chatId);
      console.log('index');
      console.log(index);

      // update the messages
      factory.chats[index].messages = messages;
    },
    setChats: function(chats) {
      factory.chats = chats;
    },
    pushToChats: function(chat) {
      factory.chats.push(chat);
    },
    getChat: function(key) {
      return factory.chats[key];
    },
    getChats: function() {
      return factory.chats;
    }
  };
  return factory;
})

// storing current chat room info
// for passing info across states
.factory('chat', function() {
  var chat = {};
  return {
    setProperty: function(chatroom, messages, agent, renter) {
      chat.chatroom = chatroom;
      chat.messages = messages;
      chat.agent = agent;
      chat.renter = renter;
    },
    getProperty: function() {
      return chat;
    }
  }
})

// for viewing apartment details in property listing page
.factory('currentApartment', function() {
  var currentApartment = {};
  return {
    setProperty: function(apartment) {
      currentApartment = apartment;
    },
    getProperty: function() {
      return currentApartment;
    }
  }
})

.factory('currentUser', function() {
  var currentUser = {};
  return {
    setProperty: function(user) {
      currentUser = user;
    },
    getProperty: function() {
      return currentUser;
    }
  }
})

.factory('User', function() {
  var user = {
    config_name: null
  };

  return user;
})

// storing current enquiry info
// for passing info across states
.factory('currentEnquiry', function() {
  var currentEnquiry = null;
  return {
    setProperty: function(enquiry) {
      currentEnquiry = enquiry;
    },
    getProperty: function() {
      return currentEnquiry;
    }
  }
})




// Raw data only for testings, when work. safe to remove
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

.factory('Renters', function() {
  var renters = [{
    id: 24,
    name: "Ben Sparrow"
  }];

  return {
    all: function() {
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

.factory('Agents', function() {
  var agents = [{
    id: 20,
    name: "Jason Bourne"
  }]

  return {
    all: function() {
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
