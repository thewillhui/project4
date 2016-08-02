angular.module('simplyHome.services', [])


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


.factory('Kowloon', function() {

  var kowloon = [
    { district: 'Yau Tong' },
    { district: 'Lam Tin' },
    { district: 'Tsim Sha Tsui' },
    { district: 'Jordon' },
    { district: 'To Kwa Wan' },
    { district: 'Kowloon City' },
    { district: 'Tai Kok Tsui' },
    { district: 'Olympic' },
    { district: 'Kowloon Station' },
    { district: 'Sham Shui Po' },
    { district: 'Shek Kip Mei' },
    { district: 'San Po Kong' },
    { district: 'Wong Tai Sin' },
    { district: 'Prince Edward' },
    { district: 'Mong Kok' },
    { district: 'Yau Ma Tei' },
    { district: 'Lai Chi Kok' },
    { district: 'Cheung Sha Wan' },
    { district: 'Mei Foo' },
    { district: 'Lai King' },
    { district: 'Kwun Tong' },
    { district: 'Ngau Tau Kok' },
    { district: 'Kowloon Tong' },
    { district: 'Ho Man Tin' },
    { district: 'Yau Yat Tsuen' },
    { district: 'Kowloon Bay' },
    { district: 'Ngau Chi Wan' },
    { district: 'Hung Hom' },
    { district: 'Whampoa' },
    { district: 'Diamond Hill' },
    { district: 'Lok Fu' }
  ]
  return {
    all: function() {
      return kowloon;
    }
  };
})

.factory('NewTerritories', function() {

  var newTerritories = [
    { district: 'Yuen Long' },
    { district: 'Tin Shui Wai' },
    { district: 'Tuen Mun' },
    { district: 'Tsuen Wan' },
    { district: 'Tai Wo Hau' },
    { district: 'Tsing Yi' },
    { district: 'Tseung Kwan O' },
    { district: 'Tai Po' },
    { district: 'Tai Wo' },
    { district: 'Sha Tin' },
    { district: 'Tai Wai' },
    { district: 'Fo Tan' },
    { district: 'Sham Tseng' },
    { district: 'Sai Kung' },
    { district: 'Clear Water Bay' },
    { district: 'Ma On Shan' },
    { district: 'Kwai Chung' },
    { district: 'Kwai Fong' },
    { district: 'Fan Ling' },
    { district: 'Sheung Shui' },
    { district: 'Tung Chung' },
    { district: 'Ma Wan' },
    { district: 'Discovery Bay' },
    { district: 'Lantau Island' },
    { district: 'Peng Chau' },
    { district: 'Lamma Island' },
    { district: 'Cheung Chau' },
    { district: 'Other Islands' }
  ]
  return {
    all: function() {
      return newTerritories;
    }
  };
})


// .factory('Chats', function() {
//   // Might use a resource here that returns a JSON array

//   // Some fake testing data
//   var chats = [{
//     id: 0,
//     name: 'Ben Sparrow',
//     lastText: 'You on your way?',
//     face: 'img/ben.png'
//   }, {
//     id: 1,
//     name: 'Max Lynx',
//     lastText: 'Hey, it\'s me',
//     face: 'img/max.png'
//   }, {
//     id: 2,
//     name: 'Adam Bradleyson',
//     lastText: 'I should buy a boat',
//     face: 'img/adam.jpg'
//   }, {
//     id: 3,
//     name: 'Perry Governor',
//     lastText: 'Look at my mukluks!',
//     face: 'img/perry.png'
//   }, {
//     id: 4,
//     name: 'Mike Harrington',
//     lastText: 'This is wicked good ice cream.',
//     face: 'img/mike.png'
//   }];

//   return {
//     all: function() {
//       return chats;
//     },
//     remove: function(chat) {
//       chats.splice(chats.indexOf(chat), 1);
//     },
//     get: function(chatId) {
//       for (var i = 0; i < chats.length; i++) {
//         if (chats[i].id === parseInt(chatId)) {
//           return chats[i];
//         }
//       }
//       return null;
//     }
//   };
// });
