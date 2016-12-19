//Setting up route
angular.module('mean').config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise(function($injector, $location){
        $injector.invoke(['$state', function($state) {
            $state.go('404');
        }]);
    });
    $stateProvider
        .state('home',{
            url : '/',
            views: {
                'header': {
                    controller: 'homeHeaderController',
                    templateUrl: 'views/home-header/index.html'
                },
                'content': {
                    controller:'IndexController',
                    templateUrl: 'views/index.html'
                },
                'footer': {
                    controller: 'homeFooterController',
                    templateUrl: 'views/home-footer/index.html'
                }
            },
            data: {
                css: 'css/style.css'
            }
        })
        .state('about',{
            url : '/about-us',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'AboutController',
                    templateUrl: 'views/about/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('account',{
            url : '/account',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'AccountController',
                    templateUrl: 'views/account/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('addressBook',{
            url : '/address-book',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'AddressBookController',
                    templateUrl: 'views/address-book/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('businessCardCreate',{
            url : '/businesscard-create',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'BusinesscardCreateController',
                    templateUrl: 'views/business-card-create/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('conactUs',{
            url : '/contact-us',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'ConatctUsController',
                    templateUrl:'views/contact-us/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('earnings',{
            url : '/earnings',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'EarningsController',
                    templateUrl: 'views/earnings/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('earnPoints',{
            url : '/earn-points',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'EarnPointsController',
                    templateUrl: 'views/earn-points/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('enguiries',{
            url : '/enguiries',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'EnguiriesController',
                    templateUrl: 'views/enguiries/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('freeCards',{
            url : '/free-cards',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'FreeCardsController',
                    templateUrl:'views/free-cards/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('messageDisplay',{
            url : '/message-display',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'MessageDisplayController',
                    templateUrl:'views/message-display/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('multipleShortProfile',{
            url : '/multiple-short-profile',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'MultipleShortProfileController',
                    templateUrl: 'views/multiple-short-profile/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('nquireInvite',{
            url : '/nquire-invite',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'NquireInvitesController',
                    templateUrl:'views/nquire-invite/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('packagedCards',{
            url : '/packaged-cards',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'PackedCardsController',
                    templateUrl: 'views/packaged-cards/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('postYourEnquiry',{
            url : '/post-your-enquiry',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'PostYourEnquiryController',
                    templateUrl: 'views/post-your-enquiry/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('setting',{
            url : '/setting',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'SettingController',
                    templateUrl: 'views/setting/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('studentProfile',{
            url : '/student-profile',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'StudentProfileController',
                    templateUrl: 'views/student-profile/index.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('SignIn',{
            url : '/signin',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'',
                    templateUrl: 'views/users/signin.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('SignUp',{
            url : '/signup',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'',
                    templateUrl: 'views/users/signup.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('articles',{
            url : '/article',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'ArticlesController',
                    templateUrl: 'views/articles/list.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
                    templateUrl: 'views/default-footer/index.html'
                }
            },
            data: {
                css: 'css/default-style.css'
            }
        })
        .state('createArticle',{
            url : '/article/create',
            views: {
                'header': {
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'ArticlesController',
                    templateUrl:'views/articles/create.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
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
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'ArticlesController',
                    templateUrl: 'views/articles/edit.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
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
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'ArticlesController',
                    templateUrl:'views/articles/view.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
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
                    controller: 'defaultHeaderController',
                    templateUrl: 'views/default-header/index.html'
                },
                'content': {
                    controller:'',
                    templateUrl: 'views/404.html'
                },
                'footer': {
                    controller: 'deafultFooterController',
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