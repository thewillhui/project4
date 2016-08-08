app.controller('AgentEnquiriesCtrl', function(chat, $state, $http, $scope, currentEnquiry){

  function getMatchedEnquiries(){
    $scope.enquiries = [];
    $http
      .get('http://localhost:3000/api/enquiry_agents/')
      .then(function(data){
        // renters is in data.data
        angular.forEach(data.data, function(enquiry){
          $scope.enquiries.push(enquiry);
        })
      })
  }
  $scope.showEnquiryDetails = function(enquiry){
    // $scope.enquiry = enquiry;
    currentEnquiry.setProperty(enquiry);
    $state.go('tab.agent-enquiry')
  }
  getMatchedEnquiries();

})