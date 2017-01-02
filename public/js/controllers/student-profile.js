angular.module('mean.system').controller('StudentProfileController', ['$scope', '$uibModal', 'Global','$ProfileService', function ($scope, $uibModal, Global, $ProfileService) {
    $scope.global = Global;

    $scope.myImage='';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      $('#myModal').show();
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#img-file')).on('change',handleFileSelect);

    $ProfileService.get(1, function (response) {
    	console.log(response);
    });
    

    $scope.user = {
    	title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua et dolore magna aliqua consectetur adipisicing elit Ut enim ad minim veniam'
 	};

 	 $scope.animationsEnabled = true;

 	 $scope.cropImageFunction = function(size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'imageCropModal.html',
            controller: 'StudentProfileController',
            size: size,
            resolve: {
                items: function() {
                    return $scope.myCroppedImage;
                }
            }
        });

        modalInstance.result.then(function(serverMsg) {
            $scope.selected = serverMsg;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });

    }

    $scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};


}]);


  