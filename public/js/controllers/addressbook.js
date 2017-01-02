angular.module('mean.system').controller('AddressBookController', ['$scope', '$uibModal', '$log', '$AddressBookService', '$SessionService', 'lodash', function($scope, $uibModal, $log, $AddressBookService, $SessionService, lodash) {
    $scope.list = [];
    $scope.seletedContact = null;
    $scope.monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    $scope.slidersImage = ['images/slider1.jpg', 'images/slider2.jpg', 'images/slider3.jpg'];

    $scope.cardsCount = 0;
    $scope.feedbackCount = 0;
    $scope.notesCount = 0;

    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function() {
        slides.push({
            image: $scope.slidersImage[slides.length % 3],
            id: currIndex++
        });
    };

    $scope.randomize = function() {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
    };

    for (var i = 0; i < 3; i++) {
        $scope.addSlide();
    }

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
        for (var i = 0, l = slides.length; i < l; i++) {
            slides[i].id = indexes.pop();
        }
    }

    function generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < currIndex; ++i) {
            indexes[i] = i;
        }
        return shuffle(indexes);
    }


    function shuffle(array) {
        var tmp, current, top = array.length;

        if (top) {
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        }

        return array;
    }


    $scope.firstToUpperCase = function(str) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }

    $scope.authUser = $SessionService.user();


    $scope.getAllcontacts = function() {
        var authUser = $SessionService.user();
        $AddressBookService.getAllAddressBook(authUser.id, function(response) {
            $scope.list = [];
            $scope.ActivityList = [];
            $scope.AllContacts = response.result;
            $scope.AllContactsCount = Object.keys($scope.AllContacts).length;
            angular.forEach($scope.AllContacts, function(value, key) {
                var name = value.name;
                var category = value.category;

                if (value.name != null) {
                    var nameOrderChar = name.charAt(0).toUpperCase();
                    value.nameOrderChar = nameOrderChar;
                    value.name = $scope.firstToUpperCase(value.name);
                } else {
                    var nameOrderChar = '-';
                    value.nameOrderChar = '-';
                }

                if (value.category != null) {
                    value.category = $scope.firstToUpperCase(value.category);
                    value.categoryLetter = category.charAt(0).toUpperCase();
                } else {
                    value.categoryLetter = '';
                }
                if (value.dob != null) {
                    var dob = new Date(value.dob);
                    var day = dob.getDate();
                    var monthIndex = dob.getMonth();
                    var year = dob.getFullYear();
                    value.dobShow = day + '-' + $scope.monthNames[monthIndex] + '-' + year;
                } else {
                    value.dobShow = '';
                }
                var itemIn = true;
                var itemArray = {};
                itemArray.contactlist = [];


                if ($scope.list.length > 0) {
                    angular.forEach($scope.list, function(listValue, listKet) {
                        if (listValue.alphabet == nameOrderChar) {
                            itemIn = false;
                            listValue.contactlist.push(value);
                        }
                    });
                    if (itemIn) {
                        itemArray.alphabet = nameOrderChar;
                        itemArray.contactlist.push(value);
                        $scope.list.push(itemArray);
                    }
                } else {
                    $scope.seletedContact = value;
                    itemArray.alphabet = nameOrderChar;
                    itemArray.contactlist.push(value);
                    $scope.list.push(itemArray);
                }




                if (Object.keys(value.AddressbookActivities).length) {
                    angular.forEach(value.AddressbookActivities, function(valueActivites, keyActivites) {
                        var activity = {};
                        activity.data = [];
                        var statusBollen = true;
                        var activitydata = valueActivites;

                        activity.date = new Date(valueActivites.createdAt);
                        var day = activity.date.getDate();
                        var monthIndex = activity.date.getMonth();
                        var year = activity.date.getFullYear();
                        activitydata.id = value.id;
                        activitydata.name = value.name;
                        activity.ShowDate = day + '-' + $scope.monthNames[monthIndex] + '-' + year;

                        if (Object.keys($scope.ActivityList).length) {
                            angular.forEach($scope.ActivityList, function(valAct, keyAct) {
                                if (valAct.ShowDate == activity.ShowDate) {
                                    statusBollen = false;
                                    valAct.data.push(activitydata);
                                }
                            });
                            if (statusBollen) {
                                activity.data.push(activitydata);
                                $scope.ActivityList.push(activity);
                            }
                        } else {
                            activity.data.push(activitydata);
                            $scope.ActivityList.push(activity);
                        }





                    });
                }
            });



            angular.forEach($scope.ActivityList, function(value) {
                var data = value.data;

                angular.forEach(data, function(valDate) {
                    if (valDate.activity == 'note') {
                        $scope.notesCount++;
                    } else if (valDate.activity == 'feedback') {
                        $scope.feedbackCount++;
                    } else if (valDate.activity == 'cards') {
                        $scope.cardsCount++;
                    }

                });
            });
            $scope.ActivityList = lodash.orderBy($scope.ActivityList, ['date'], ['desc']);
        });

    }

    $scope.getAllcontacts();


    $scope.noteColor = '#F781BF';
    $scope.colorsel = function(colour) {
        $scope.noteColor = colour;
    }

    $scope.animationsEnabled = true;

    $scope.addNewAddressBook = function(size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addressBookCreate.html',
            controller: 'AddAddressBookController',
            size: size,
            resolve: {
                items: function() {
                    return {};
                }
            }
        });

        modalInstance.result.then(function(serverMsg) {
            $scope.selected = serverMsg;
            $scope.getAllcontacts();
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });

    }



    $scope.getContactDetails = function($parentIndex, $index) {
        angular.forEach($scope.list, function(value, key) {
            if (key == $parentIndex) {
                angular.forEach(value.contactlist, function(valueContactlist, keyContactlist) {
                    if ($index == keyContactlist) {
                        $scope.seletedContact = valueContactlist;
                    }
                });
            }
        });
    }

    $scope.updateConatct = function(size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addressBookEdit.html',
            controller: 'AddAddressBookController',
            size: size,
            resolve: {
                items: function() {
                    return $scope.seletedContact;
                }
            }
        });

        modalInstance.result.then(function(serverMsg) {
            $scope.selected = serverMsg;
            $scope.getAllcontacts();
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });


    }

    $scope.deleteContact = function(size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addressBookDelete.html',
            controller: 'AddAddressBookController',
            size: size,
            resolve: {
                items: function() {
                    return $scope.seletedContact;
                }
            }
        });

        modalInstance.result.then(function(serverMsg) {
            $scope.selected = serverMsg;
            $scope.getAllcontacts();
        }, function() {
            $scope.getAllcontacts();
            $log.info('Modal dismissed at: ' + new Date());
        });
    }


    $scope.importEmailContact = function(size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'importEmailContact.html',
            controller: 'AddAddressBookController',
            size: size,
            resolve: {
                items: function() {
                    return {};
                }
            }
        });

        modalInstance.result.then(function(serverMsg) {
            $scope.selected = serverMsg;
            $scope.getAllcontacts();
        }, function() {
            $scope.getAllcontacts();
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    $scope.messageModal = function(msg, cls) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'messageModal.html',
            controller: 'AddAddressBookController',
            size: 'sm',
            resolve: {
                items: function() {
                    return { message: msg, messageClass: cls };
                }
            }
        });

        modalInstance.result.then(function(serverMsg) {
            $scope.selected = serverMsg;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    $scope.userAtivitysend = function(activity, content) {
        if ($scope.seletedContact == null) {
            $scope.messageModal('Select Contact', 'alert alert-danger');
        } else if ($scope.seletedContact.email == undefined || $scope.seletedContact.email == null || $scope.seletedContact.email == '') {
            $scope.messageModal('Add Email Details in Contact', 'alert alert-danger');
        } else if (content == undefined) {
            $scope.messageModal('Add ' + activity, 'alert alert-danger');
        } else {
            var data = {};
            $scope.notesText = null;
            $scope.feedbackText = null;


            data.activity = activity;


            if (activity == 'cards') {
                data.content = '<img src="' + window.location.origin + '/' + content + '"/>';
            } else {
                data.content = content;
            }
            data.AddressbookId = $scope.seletedContact.id;
            data.email = $scope.seletedContact.email;
            data.name = $scope.seletedContact.name;
            $AddressBookService.saveActivity(data, function(response) {
                $scope.ge.tAllcontacts();
            });
        }
    }

    $scope.searchConatct =function(){
        $scope.searchContact = $scope.search;
    }


}]);



angular.module('mean.system').controller('AddAddressBookController', ['$scope', '$window', '$uibModalInstance', 'items', '$AuthService', 'FlashService', '$timeout', '$AddressBookService', '$SessionService', '$auth', function($scope, $window, $uibModalInstance, items, $AuthService, FlashService, $timeout, $AddressBookService, $SessionService, $auth) {

    $scope.item = items;

    if ($scope.item.message != undefined) {
        $timeout(function() {
            $uibModalInstance.close('close');
        }, 5000);
    }

    if ($scope.item.dob != undefined) {
        $scope.item.dob = new Date($scope.item.dob);
    }

    $scope.today = function() {
        $scope.item.dob = new Date();
    };


    $scope.clear = function() {
        $scope.item.dob = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dob = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{
        date: tomorrow,
        status: 'full'
    }, {
        date: afterTomorrow,
        status: 'partially'
    }];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }



    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.Create = function(item) {
        var authUser = $SessionService.user();
        $scope.item.UserId = authUser.id;
        $AddressBookService.create($scope.item, function(response) {
            FlashService.show();
            var serverMsg = { resStatus: response.resStatus, msg: response.msg };
            if (response.resStatus == "error") {
                $scope.serverMsg = serverMsg;
            } else if (response.resStatus == "success") {
                serverMsg = { resStatus: response.resStatus, msg: 'Contact Successfully Add', verifyId: response.result };
                $scope.serverMsg = serverMsg;
                $timeout(function() {
                    $uibModalInstance.close(serverMsg);
                }, 1000);
            }
            FlashService.hide();
        });

    };


    $scope.updateContact = function(item) {
        $AddressBookService.updateAddressBook(item.id, item, function(response) {
            FlashService.show();
            var serverMsg = { resStatus: response.resStatus, msg: response.msg };
            if (response.resStatus == "error") {
                $scope.serverMsg = serverMsg;
            } else if (response.resStatus == "success") {
                serverMsg = { resStatus: response.resStatus, msg: 'Contact Successfully Update', verifyId: response.result };
                $scope.serverMsg = serverMsg;
                $timeout(function() {
                    $uibModalInstance.close(serverMsg);
                }, 1000);
            }
            FlashService.hide();
        });
    }

    $scope.deleteContact = function(item) {
        $AddressBookService.deleteAddressBook(item.id, function(response) {
            FlashService.show();
            var serverMsg = { resStatus: response.resStatus, msg: response.msg };
            if (response.resStatus == "error") {
                $scope.serverMsg = serverMsg;
            } else if (response.resStatus == "success") {
                serverMsg = { resStatus: response.resStatus, msg: 'Contact Successfully Delete', verifyId: response.result };
                $scope.serverMsg = serverMsg;

                $uibModalInstance.close(serverMsg);

            }
            FlashService.hide();
        });
    }


    $scope.authenticate = function(provider) {
        var authUser = $SessionService.user();
        $auth.authenticate(provider, { userIDdata: authUser.id });
    };

}]);
