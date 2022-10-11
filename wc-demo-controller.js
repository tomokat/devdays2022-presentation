(function() {
  angular.module('wcDemoApp').controller('WcDemoController', WcDemoController);

  function WcDemoController() {
    var vm = this;

    vm.text = '';

    vm.openWc = function() {
      document.querySelector('ed-modal').show = true;
      document.querySelector('ed-text-editor').externalText = vm.text;
    }

    vm.updateText = function(event) {
      if (event.detail !== 'Text Update - Cancelled') {
        vm.text = event.detail;
      }
      document.querySelector('ed-modal').show = false;
    }
  }
})();