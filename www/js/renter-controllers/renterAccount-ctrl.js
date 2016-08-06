angular.module('simplyHome.controllers')

.controller('AccountCtrl', function($scope, $http, $auth) {

 $http
 .get('http://localhost:3000/api')


})

