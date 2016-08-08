app.controller('EnquiryCtrl', function($scope, $state, $http, SERVER) {

  $scope.bedroomsBtns = [
    { number: 'Studio' },
    { number: '1' },
    { number: '2' },
    { number: '3' },
    { number: '4+' }
  ]

  $scope.bathroomsBtns = [
    { number: 'Any' },
    { number: '1' },
    { number: '2' },
    { number: '3+' }
  ]

  $scope.daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  $scope.timeOfDay = [
    'Morning',
    'Afternoon',
    'Evening'
  ]



  $scope.region = {
    'Hong Kong Island': ['Aberdeen', 'Admiralty', 'Wan Chai', 'Tin Hau', 'Tai Hang', 'Tai Koo', 'Shau Kei Wan', 'Heng Fa Chuen', 'Sai Wan Ho', 'Quarry Bay', 'North Point', 'Fortress Hill', 'Mid-Levels', 'Island West', 'Island South', 'Chai Wan', 'Shek O', 'Central', 'Sheung Wan', 'Causeway Bay'],
    'Kowloon': ['Yau Tong', 'Lam Tin', 'Tsim Sha Tsui', 'Jordon', 'To Kwa Wan', 'Kowloon City', 'Tai Kok Tsui', 'Olympic', 'Kowloon Station', 'Sham Shui Po', 'Shek Kip Mei', 'San Po Kong', 'Wong Tai Sin', 'Prince Edward', 'Mong Kok', 'Yau Ma Tei', 'Lai Chi Kok', 'Cheung Sha Wan', 'Mei Foo', 'Lai King', 'Kwun Tong', 'Ngau Tau Kok', 'Kowloon Tong', 'Ho Man Tin', 'Yau Yat Tsuen', 'Kowloon Bay', 'Ngau Chi Wan', 'Hung Hom', 'Whampoa', 'Diamond Hill', 'Lok Fu'],
    'New Territories': ['Yuen Long', 'Tin Shui Wai', 'Tuen Mun', 'Tsuen Wan', 'Tai Wo Hau', 'Tsing Yi', 'Tseung Kwan O', 'Tai Po', 'Tai Wo', 'Sha Tin', 'Tai Wai', 'Fo Tan', 'Sham Tseng', 'Sai Kung', 'Clear Water Bay', 'Ma On Shan', 'Kwai Chung', 'Kwai Fong', 'Fan Ling', 'Sheung Shui', 'Tung Chung', 'Ma Wan', 'Discovery Bay', 'Lantau Island', 'Peng Chau', 'Lamma Island', 'Cheung Chau', 'Other Islands']
  }

  //this gets set back to the backend
  $scope.enquiry = {
    areas: [],
    bedroom_num: '',
    bathroom_num: '',
    price_min: 0,
    price_max: 0,
    property_size_min: 0,
    property_size_max: 0,
    movein_date: '',
    urgent: 'Non-urgent',
    available_days: [],
    timeslot: [],
    remarks: ''
  };


  //only need to parse when sending to the backend
  var parseDate = function() {
    var dates = $scope.movein;
    var parsedDate = moment(dates).format("DD/MM/YYYY");
    $scope.enquiry.movein_date = parsedDate;
  }


  // var parseTime = function(){
  //   var times = $scope.time;
  //   for (var time in times) {
  //     var parsedTime = moment(times[time]).format("hh:mm a");
  //     $scope.enquiry.availability.time = parsedTime;
  //   }
  // }

  //if an area is selected the function checks if it's in the enquiry object, if it is then remove it if not then add it. mimicks the checkbox functionality
  $scope.addAreaKey = function(area) {
    var areaArr = $scope.enquiry.areas;
    var areaIndex = areaArr.indexOf(area);
    if (areaIndex >= 0) {
      areaArr.splice(areaIndex, 1);
    } else {
      areaArr.push(area);
    }
  };

  $scope.addDayOfWeek = function(day) {
    var daysArr = $scope.enquiry.available_days;
    var daysIndex = daysArr.indexOf(day);
    if (daysIndex >= 0) {
      daysArr.splice(daysIndex, 1);
    } else {
      daysArr.push(day);
    }
  };

  $scope.addTimeOfDay = function(time) {
    var timeArr = $scope.enquiry.timeslot;
    var timeIndex = timeArr.indexOf(time);
    if (timeIndex >= 0) {
      timeArr.splice(timeIndex, 1);
    } else {
      timeArr.push(time);
    }
  };
  //for making the buttons in button bar act like radio buttons
  $scope.active = '';
  $scope.setActive = function(type) {
    $scope.active = type;
  };
  $scope.isActive = function(type) {
    return type === $scope.active;
  };

  $scope.activeB = '';
  $scope.setActiveB = function(typeB) {
    $scope.activeB = typeB;
  };
  $scope.isActiveB = function(typeB) {
    return typeB === $scope.activeB;
  };

  $scope.activeC = '';
  $scope.setActiveC = function(typeC) {
    $scope.activeC = typeC;
  };
  $scope.isActiveC = function(typeC) {
    return typeC === $scope.activeC;
  };


  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */

  //key is from the ng-repeat. each ion-item must have unique directives or the accordion won't work
  $scope.toggleGroup = function(regionName) {
    if ($scope.isGroupShown(regionName)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = regionName;
    }
  };
  $scope.isGroupShown = function(regionName) {
    return $scope.shownGroup === regionName;
  };


  $scope.sendEnquiry = function() {
    parseDate();
    // parseTime();
    $http
      .post(SERVER.url + '/api/enquiries', $scope.enquiry)
      .then(function(resp) {
        console.log(resp.status);
        console.log(resp.data);
      })
  }
  //if an area is selected the function checks if it's in the enquiry object, if it is then remove it if not then add it. mimicks the checkbox functionality
  $scope.addAreaKey = function(area){
    var areaArr = $scope.enquiry.areas;
    var areaIndex = areaArr.indexOf(area);
    if (areaIndex>=0){
      areaArr.splice(areaIndex,1);
    } else {
      areaArr.push(area);
    }
  };
})