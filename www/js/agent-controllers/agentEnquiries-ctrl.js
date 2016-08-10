app.controller('AgentEnquiriesCtrl', function(chat, $state, $http, $scope, currentEnquiry, SERVER, $auth){
  window.auth = $auth;

  $scope.getMatchedEnquiries = function(){
    $scope.enquiries = [];
    $http
      .get(SERVER.url + '/api/enquiry_agents/')
      .then(function(data){
        console.log(data)
        // renters is in data.data
        angular.forEach(data.data, function(enquiry){
          $scope.enquiries.push(enquiry);
        })
        console.log($scope.enquiries)
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      })
  }

  $scope.showEnquiryDetails = function(enquiry){
    // $scope.enquiry = enquiry;
    currentEnquiry.setProperty(enquiry);
    console.log(currentEnquiry.getProperty());
    $state.go('tab.agent-enquiries.enquiry-detail')
  }
  $scope.getMatchedEnquiries();


 $scope.parseDateTime = function(dateTime) {
    return moment(dateTime).fromNow();
  };
})