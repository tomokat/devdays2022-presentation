(function() {
  angular.module('wcDemoApp').directive('wcEvent', function($parse, $window) {
    return {
      restrict: 'A',
        link: function(scope, element, attrs) {
        var eventName = attrs.wcEventName;
        var callback = $parse(attrs.wcEvent);
        $window.addEventListener(eventName, event => {
          console.log('successfully captured global event from wc', event);
          // scope.$apply(() => {
          callback(scope, {event:event});
          // });
        });
      }
    };
  });
})();