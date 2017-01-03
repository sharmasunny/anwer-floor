angular.module('mean.system').controller('StudentProfileController', ['$scope', '$http', '$uibModal', '$log', 'Global', '$ProfileService','$SessionService', function($scope, $http, $uibModal, $log, Global, $ProfileService,$SessionService) {
    $scope.global = Global;
    $scope.animationsEnabled = true;
    $scope.tags = [];
    $scope.user ={};

    $scope.UploadImage = function(event) {

        var image = new Image();
        var file = event.target.files[0];
        var myReader = new FileReader();
        myReader.onloadend = function(loadEvent) {
            image.src = loadEvent.target.result;

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'imageCropModal.html',
                controller: 'ProfileModalController',
                size: 'lg',
                resolve: {
                    items: function() {
                        return image.src;
                    }
                }
            });

            modalInstance.result.then(function(image) {
                $scope.user.image = image;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };

        myReader.readAsDataURL(file);
    }


    $ProfileService.get(1, function(response) {
        console.log(response);
    });


    $scope.Create = function(user) {
        var authUser = $SessionService.user();
        $scope.user.UserId = authUser.id;
        $ProfileService.createProfile($scope.user,function(response){
            console.log(response);
        }); 
    }



}]);


angular.module('mean.system').controller('ProfileModalController', ['$scope', '$window', '$uibModalInstance', 'items', '$ProfileService','$SessionService', function($scope, $window, $uibModalInstance, items, $ProfileService,$SessionService) {
    $scope.myImage = items;
    $scope.myCroppedImage = '';

    $scope.dataURItoBlob = function(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var bb = new Blob([ab], { type: mimeString });
        return bb;
    }

    $scope.saveImage = function() {
        var authUser = $SessionService.user();
        var formData = new FormData();
        var image = $scope.dataURItoBlob($scope.myCroppedImage);
        formData.append("image", image);
        formData.append("id",authUser.id);
        $ProfileService.imageUpload(formData, function(response) {
            $uibModalInstance.close(response.filename);
        });

    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };



}]);
