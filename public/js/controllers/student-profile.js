angular.module('mean.system').controller('StudentProfileController', ['$scope', '$http', '$state', '$uibModal', '$log', 'Global', '$ProfileService', '$SessionService', '$LocalService', '$geolocation', function($scope, $http, $state, $uibModal, $log, Global, $ProfileService, $SessionService, $LocalService, $geolocation) {
    $scope.global = Global;
    $scope.animationsEnabled = true;
    $scope.user = {};
    var authUser = $SessionService.user();
    if (authUser.image != '' || authUser.image != undefined) {
        $scope.image = authUser.image;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function() {
                $scope.position = position;
                console.log($scope.position, ' $scope.position ');

            });
        });
    }


    $scope.IMageEditModel = function() {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'avitarHtml.html',
            controller: 'avitarModalController',
            size: 'lg',
            resolve: {
                items: function() {
                    return {};
                }
            }
        });

        modalInstance.result.then(function(image) {
            $scope.image = image;
            var UserDetail = $SessionService.getUser();
            UserDetail.result.image = $scope.image;
            $LocalService.set('auth_user', JSON.stringify(UserDetail));
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }




    $scope.getProfileDetails = function() {
        $scope.authUser = $SessionService.user();
        $ProfileService.get($scope.authUser.id, function(response) {
            if (Object.keys(response.result).length > 0) {
                $scope.profileId = response.result[0].id
                $scope.userprofile = response.result[0];
                $scope.userprofile.languages = JSON.parse($scope.userprofile.languages);
                $scope.userprofile.interests = JSON.parse($scope.userprofile.interests);
                $scope.userprofile.skills = JSON.parse($scope.userprofile.skills);
                $ProfileService.getLocation(function(response) {

                    $scope.userprofile.location = ($scope.userprofile.location == null || $scope.userprofile.location == undefined ? response.city : $scope.userprofile.location);

                });
            }

        });
    }

    $scope.showTxt = true;

    $scope.updateprofile = function() {
        $scope.showTxt = ($scope.showTxt == true ? false : true);

    }

    $scope.saveProfile = function() {
        var data = {};
        var user = ($scope.userprofile != undefined ? $scope.userprofile : {});
        var authUser = $SessionService.user();
        data.UserId = authUser.id;
        data.info = user.info;
        data.category = user.category;
        data.education = user.education;
        data.location = user.location;
        data.rate = user.rate;
        data.interests = JSON.stringify(user.interests);
        data.languages = JSON.stringify(user.languages);
        data.skills = JSON.stringify(user.skills);
        $ProfileService.createProfile(data, function(response) {
            $scope.showTxt = ($scope.showTxt == true ? false : true);
        });
    }

    $scope.getProfileDetails();

    $scope.Create = function(user) {
        var data = {};
        var authUser = $SessionService.user();
        data.UserId = authUser.id;
        data.info = user.info;
        data.category = user.category;
        data.education = user.education;
        data.location = user.location;
        data.rate = user.rate;
        data.interests = JSON.stringify(user.interests);
        data.languages = JSON.stringify(user.languages);
        data.skills = JSON.stringify(user.skills);
        $ProfileService.createProfile(data, function(response) {
            var UserDetail = $SessionService.getUser();
            UserDetail.result.image = $scope.image;
            $LocalService.set('auth_user', JSON.stringify(UserDetail));
            $state.go("user.studentProfile");
        });
    }


    $scope.editProfile = function() {
        $state.go("user.editProfile");
    }


    /***************Enquiry Modal***********/
    $scope.postRequirements = function() {
        $scope.animationsEnabled = true;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'requirementModal.html',
            controller: 'RequirementModalController',
            size: 'lg',
            resolve: {
                items: function() {
                    return $scope.profileId;
                }
            }
        });

        modalInstance.result.then(function(items) {
            console.log(items)
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

}]);


angular.module('mean.system').controller('ProfileModalController', ['$scope', '$window', '$uibModalInstance', 'items', '$ProfileService', '$SessionService', function($scope, $window, $uibModalInstance, items, $ProfileService, $SessionService) {
    $scope.myImage = items;
    $scope.myCroppedImage = '';



    $scope.cancel = function() {
        console.log(1);
        $uibModalInstance.dismiss('cancel');
    };

}]);




angular.module('mean.system').controller('avitarModalController', ['$scope', '$window', '$uibModalInstance', 'items', '$ProfileService', '$SessionService', '$uibModal', '$log', 'FlashService', function($scope, $window, $uibModalInstance, items, $ProfileService, $SessionService, $uibModal, $log, FlashService) {
    $scope.item = items;
    $scope.myImage = '';
    $scope.myCroppedImage = '';
    $scope.showAvitor = true;

    $scope.avitarImages = 26;

    $scope.range = function(count) {

        var avitar = [];

        for (var i = 1; i < count; i++) {
            avitar.push(i)
        }

        return avitar;
    }

    var fileTypes = ['jpg', 'jpeg', 'png'];

    $scope.UploadImage = function(event) {

        var image = new Image();
        var file = event.target.files[0];
        var extension = file.name.split('.').pop().toLowerCase();
        var isSuccess = fileTypes.indexOf(extension) > -1;

        if (isSuccess) {
            var myReader = new FileReader();
            myReader.onloadend = function(loadEvent) {
                $scope.$apply(function() {
                    image.src = loadEvent.target.result;
                    $scope.myImage = image.src;
                    $scope.showAvitor = false;
                    $scope.AvatorIMage = null;
                    // var modalInstance = $uibModal.open({
                    //     animation: $scope.animationsEnabled,
                    //     ariaLabelledBy: 'modal-title',
                    //     ariaDescribedBy: 'modal-body',
                    //     templateUrl: 'imageCropModal.html',
                    //     controller: 'ProfileModalController',
                    //     size: 'lg',
                    //     resolve: {
                    //         items: function() {
                    //             return image.src;
                    //         }
                    //     }
                    // });

                    // modalInstance.result.then(function(image) {
                    //     $scope.image = image;
                    // }, function() {
                    //     $log.info('Modal dismissed at: ' + new Date());
                    // });
                });
            };

            myReader.readAsDataURL(file);
        } else {
            alert('Select PNG, JPEG and JPG IMAGE ONLY');
        }
    }


    $scope.getAviateImage = function(id) {
        $scope.selectedAvator = id;
        $scope.AvatorIMage = 'avitar/' + id + '.png';
    };


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
        if ($scope.AvatorIMage) {
            var data = {};
            data.id = authUser.id;
            data.image = $scope.AvatorIMage;
            $ProfileService.updateImage(data, function(response) {
                $uibModalInstance.close(response.filename);
            });
        } else {
            var formData = new FormData();
            var image = $scope.dataURItoBlob($scope.myCroppedImage);
            formData.append("image", image);
            formData.append("id", authUser.id);
            $ProfileService.imageUpload(formData, function(response) {
                $uibModalInstance.close(response.filename);
            });
        }

    };


    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    }



}]);





angular.module('mean.system').controller('RequirementModalController', ['$scope', '$state', '$window', '$uibModalInstance', 'items', '$EnquiryService', '$SessionService', '$LocalService', function($scope, $state, $window, $uibModalInstance, items, $EnquiryService, $SessionService, $LocalService) {
    $scope.item = {
        currency_type : '$',
        display_name: 'Username',
        medium: 'Home'
    };

    $scope.sendRequirements = function(item) {
        var data = item;
        var authUser = $SessionService.user();
        data.UserId = authUser.id;
        $EnquiryService.createEnquiry(data, function(response) {
            $uibModalInstance.close();
            $state.go("anon.enquiries");
        });



        // data.ProfileId = items;
        // data.enquiry = item.enquiry;
        // data.language = item.language;
        // data.rate = item.rate;
        // data.description = item.description;
        // if (data.ProfileId == '' || data.profileId == undefined) {
        //     $EnquiryService.getProfileId(data.UserId, function(response) {
        //         data.ProfileId = response.result[0].id;
        //         $EnquiryService.createEnquiry(data, function(response) {
        //             var UserDetail = $SessionService.getUser();
        //             UserDetail.result.image = $scope.image;
        //             $LocalService.set('auth_user', JSON.stringify(UserDetail));
        //             $uibModalInstance.close();
        //             $state.go("anon.enquiries");
        //         });
        //     });
        // } else {
        //     $EnquiryService.createEnquiry(data, function(response) {
        //         var UserDetail = $SessionService.getUser();
        //         UserDetail.result.image = $scope.image;
        //         $LocalService.set('auth_user', JSON.stringify(UserDetail));
        //         $uibModalInstance.close();
        //         $state.go("anon.enquiries");
        //     });

        // }

    }


    // $scope.itemArray = [
    //     {id: 1, name: 'City-1'},
    //     {id: 2, name: 'City-2'},
    //     {id: 3, name: 'City-3'}
    // ];

    // $scope.item.location = { value: $scope.itemArray[0] };

    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };
 

}]);
