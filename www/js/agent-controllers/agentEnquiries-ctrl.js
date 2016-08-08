app.controller('AgentEnquiriesCtrl', function(chat, $state, $http, $scope, currentEnquiry, SERVER){

  function getMatchedEnquiries(){
    $scope.enquiries = [];
    $http
      .get(SERVER.url + '/api/enquiry_agents/')
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
    console.log(currentEnquiry.getProperty());
    $state.go('tab.agent-enquiry')
  }
  getMatchedEnquiries();

})