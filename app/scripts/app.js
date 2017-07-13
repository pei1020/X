'use strict';

/**
 * @ngdoc overview
 * @name desktopApp
 * @description
 * # desktopApp
 *
 * Main module of the application.
 */
angular
  .module('desktopApp', [
      'ngAnimate',
      'ngMaterial',
      'ngAria',
      'myController',
      'myService',
      'ngCookies',
      'ngMessages',
      'ngRoute',
      'ngResource'
  ])
  .config(['$routeProvider', function ($routeProvider) {

      // var routeConfig = {
      //     controller: 'MainCtrl',
      //     templateUrl: 'feedback.html',
      //     resolve: {
      //         store: function (infoStorage) {
      //             // Get the correct module (API or localStorage).
      //             return infoStorage.then(function (module) {
      //                 module.get(); // Fetch the todo records in the background.
      //                 return module;
      //             });
      //         }
      //     }
      // };

    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/feedback', {
        templateUrl: 'feedback.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

      // $qProvider.errorOnUnhandledRejections(false);
  }]);
