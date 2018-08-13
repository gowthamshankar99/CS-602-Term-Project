angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
var socket = io('http://localhost:8000');
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($uibModal, $log, $document,$http) 
{
  var $ctrl = this;
  $ctrl.items = ['item1', 'item2', 'item3'];

  $http.get('http://localhost:8000/calculateTotalGain').then(function(data) {
    //alert("In here " + data.data.TotalValue);
    $ctrl.totalGain = data.data.Totalgain;
    $ctrl.totalValue = data.data.TotalValue;
})


  $http.get('http://localhost:8000/getPortfolioData').then(function(data) {
    //var resonse2 = data.data.message.Items;
    //alert(JSON.stringify(data.data));
    $ctrl.gowtham = data.data;

});

  $ctrl.animationsEnabled = true;

  $ctrl.open = function (size, parentSelector) {
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $ctrl.items;
        },
        gowtham: function()
        {
            return $ctrl.gowtham;
        }

        
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $ctrl.openComponentModal = function () {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      component: 'modalComponent',
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('modal-component dismissed at: ' + new Date());
    });
  };

  $ctrl.openMultipleModals = function () {
    $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title-bottom',
      ariaDescribedBy: 'modal-body-bottom',
      templateUrl: 'stackedModal.html',
      size: 'sm',
      controller: function($scope) {
        $scope.name = 'bottom';  
      }
    });

    $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title-top',
      ariaDescribedBy: 'modal-body-top',
      templateUrl: 'stackedModal.html',
      size: 'sm',
      controller: function($scope) {
        $scope.name = 'top';  
      }
    });
  };

  $ctrl.toggleAnimation = function () {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  };
});


angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($uibModalInstance, items,$http,gowtham,$scope) {
  $scope.resonse2 = "asdasd";
  var $ctrl = this;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };




  $ctrl.ok = function () {
      $http.get('https://arzktrqj0a.execute-api.us-east-1.amazonaws.com/PROD/' + $scope.tickerName.toUpperCase().trim()).then(function(data) {
        // dont do anything with the response for now....
        console.log("Data added " + data);
        });
      $http.get('https://fv7aoph7th.execute-api.us-east-1.amazonaws.com/Prod/' + $scope.tickerName.toUpperCase().trim() + "/" + $scope.shares.trim() +  "/" + $scope.price.trim()).then(function (data) {
  
        
      $http.get('http://localhost:8000/getPortfolioData').then(function(data) {
          //alert(JSON.stringify(data));
          $ctrl.gowtham = data;
      })
    });

    //location.reload();

    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

angular.module('ui.bootstrap.demo').component('modalComponent', {
  templateUrl: 'myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.items = $ctrl.resolve.items;
      $ctrl.selected = {
        item: $ctrl.items[0]
      };
    };

    $ctrl.ok = function () {
      $ctrl.close({$value: $ctrl.selected.item});
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({$value: 'cancel'});
    };
  }
});

angular.module('ui.bootstrap.demo').component('modalComponent', {
    templateUrl: 'myModalContent2.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: function () {
      var $ctrl2 = this;
  
      $ctrl2.$onInit = function () {
        $ctrl2.items = $ctrl2.resolve.items;
        $ctrl2.selected = {
          item: $ctrl2.items[0]
        };
      };
  
      $ctrl2.ok = function () {
        $ctrl2.close({$value: $ctrl2.selected.item});
      };
  
      $ctrl2.cancel = function () {
        $ctrl2.dismiss({$value: 'cancel'});
      };
    }
  });