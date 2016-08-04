app

  .directive('bedIcon', function() {
  var directive = {
    restrict: 'C',
    template: '<div><img class="icon" src="/img/bed-icon100.png" style="width: 30px; height: 30px; "/></div>',
    replace: true
  };

  return directive;
})

.directive('bathIcon', function() {
  var directive = {
    restrict: 'C',
    template: '<div><img class="icon" src="/img/shower-icon100.png" style="width: 30px; height: 30px; "/></div>',
    replace: true
  };

  return directive;
})
