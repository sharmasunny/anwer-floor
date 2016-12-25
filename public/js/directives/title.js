// angular.module('mean.auth').directive('updateTitle', ['$rootScope', '$timeout',
//   function($rootScope, $timeout) {
//     return {
//       link: function(scope, element) {

//         var listener = function(event, toState) {

//           var title = 'Default Title';
//           if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;

//           $timeout(function() {
//             element.text('Answer floor | '+title);
//           }, 0, false);
//         };

//         $rootScope.$on('$stateChangeSuccess', listener);
//       }
//     };
//   },
//   ]);