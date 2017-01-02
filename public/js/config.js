//Setting up route
angular.module('mean').config(['$stateProvider', 'ngMetaProvider', '$urlRouterProvider','AccessLevels', function($stateProvider,ngMetaProvider,$urlRouterProvider,AccessLevels) {

    $urlRouterProvider.otherwise(function($injector, $location){
        $injector.invoke(['$state', function($state) {
            $state.go('404');
        }]);
    });


    $stateProvider
        .state('admin', {
            abstract: true,
            template: '<div ui-view="admindashboard"></div>',
            data: {
               access: AccessLevels.admin
            }
        })
        .state('admin.dashboard',{
            url : '/admin/',
            views: {
                'admindashboard': {
                    controller:'dashboardController',
                    templateUrl: 'adminViews/dashboard.html'
                }
            }
        })





    $stateProvider
        .state('user', {
            abstract: true,
            template: '<section ui-view="header"  autoscroll="true"></section> <section ui-view="content"></section> <section ui-view="footer"></section>',
            data: {
               access: AccessLevels.user
            }
        })
        .state('user.account',{
            url : '/account',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'AccountController',
                    templateUrl: 'views/account/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Account',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('user.addressBook',{
            url : '/address-book',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'AddressBookController',
                    templateUrl: 'views/address-book/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Address Book',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('user.businessCardCreate',{
            url : '/businesscard-create',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'BusinesscardCreateController',
                    templateUrl: 'views/business-card-create/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Business Card Create',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('user.earnings',{
            url : '/earnings',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'EarningsController',
                    templateUrl: 'views/earnings/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Earnings',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('user.messageDisplay',{
            url : '/message-display',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'MessageDisplayController',
                    templateUrl:'views/message-display/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Message Display',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('user.multipleShortProfile',{
            url : '/multiple-short-profile',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'MultipleShortProfileController',
                    templateUrl: 'views/multiple-short-profile/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Multiple Short Profile',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('user.nquireInvite',{
            url : '/nquire-invite',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'NquireInvitesController',
                    templateUrl:'views/nquire-invite/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Nquire Invite',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('user.packagedCards',{
            url : '/packaged-cards',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'PackedCardsController',
                    templateUrl: 'views/packaged-cards/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Packaged Cards',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('user.postYourEnquiry',{
            url : '/post-your-enquiry',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'PostYourEnquiryController',
                    templateUrl: 'views/post-your-enquiry/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Enquiry',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('user.setting',{
            url : '/setting',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'SettingController',
                    templateUrl: 'views/setting/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Settings',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('user.studentProfile',{
            url : '/student-profile',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'StudentProfileController',
                    templateUrl: 'views/student-profile/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Student Profile',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('user.addProfile',{
            url : '/add-profile',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'StudentProfileController',
                    templateUrl: 'views/student-profile/add_profile.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Add Profile',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('user.privateMessage',{
            url : '/private-message',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'StudentProfileController',
                    templateUrl: 'views/message-display/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Private Message',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('user.notifications',{
            url : '/notifications',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'StudentProfileController',
                    templateUrl: 'views/notifications/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Notifications',
                    'description': '',
                    'author': ''
                }
            }
        })      





    $stateProvider
        .state('anon', {
            abstract: true,
            template: '<section ui-view="header"  autoscroll="true"></section> <section ui-view="content"></section> <section ui-view="footer"></section>',
            data: {
               access: AccessLevels.anon
            }
        })
        .state('anon.home',{
            url : '/',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/home-header/index.html'
                },
                'content': {
                    controller:'IndexController',
                    templateUrl: 'views/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/home-footer/index.html'
                }
            },
            data: {
                css: 'css/style.css',
                'meta': {
                    'title': 'Home',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('anon.earnPoints',{
            url : '/earn-points',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'EarnPointsController',
                    templateUrl: 'views/earn-points/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Earn Points',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('anon.about',{
            url : '/about-us',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'AboutController',
                    templateUrl: 'views/about/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'About Us',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('anon.api',{
            url : '/api',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'AboutController',
                    templateUrl: 'views/api/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'API',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('anon.career',{
            url : '/career',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'AboutController',
                    templateUrl: 'views/career/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Career',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('anon.terms',{
            url : '/terms-of-use',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'AboutController',
                    templateUrl: 'views/terms/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Terms Of Use',
                    'description': '',
                    'author': ''
                }
            }
        })
         .state('anon.privacy',{
            url : '/privacy',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'AboutController',
                    templateUrl: 'views/privacy/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Privacy',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('anon.membership-plan',{
            url : '/membership-plan',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'membershipPlanController',
                    templateUrl: 'views/membership-plan/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Membership Plan',
                    'description': '',
                    'author': ''
                }
            }
        })

        .state('anon.contactUs',{
            url : '/contact-us',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'ConatctUsController',
                    templateUrl:'views/contact-us/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Contact Us',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('anon.enguiries',{
            url : '/enguiries',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'EnguiriesController',
                    templateUrl: 'views/enguiries/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Enguiries',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('anon.freeCards',{
            url : '/free-cards',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'FreeCardsController',
                    templateUrl:'views/free-cards/index.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Free Cards',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('anon.verifyEmail',{
            url : '/verifyEmail?token',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'VerificationEmailController',
                    templateUrl: 'views/verification-email/verification.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Verify Email',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('anon.adminLogin',{
            url : '/admin-login',
             views: {
                'content': {
                    controller:'VerificationController',
                    templateUrl: 'views/adminLogin.html'
                }
            },
            data: {
                css: 'css/ad-login.css',
                'meta': {
                    'title': 'Admin Login',
                    'description': '',
                    'author': ''
                }
            }
        })




        .state('articles',{
            url : '/article',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'ArticlesController',
                    templateUrl: 'views/articles/list.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css',
                'meta': {
                    'title': 'Article',
                    'description': '',
                    'author': ''
                }
            }
        })
        .state('createArticle',{
            url : '/article/create',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'ArticlesController',
                    templateUrl:'views/articles/create.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('editArticles',{
            url : '/article/{articleId}/edit',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'ArticlesController',
                    templateUrl: 'views/articles/edit.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('viewArticle',{
            url : '/article/{articleId}',
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'ArticlesController',
                    templateUrl:'views/articles/view.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('404',{
            views: {
                'header': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'',
                    templateUrl: 'views/404.html'
                },
                'footer': {
                    controller: 'VerificationController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);

angular.module('mean').constant('AccessLevels', {
    anon: 0,
    user: 1,
    admin: 2
});

angular.module('mean').constant('SITE_CONSTANTS', {
     LOCALURl : 'localhost:3000',
     DEVURl  : '',
     LIVEURL : ''
});