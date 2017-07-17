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

    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/feedback', {
        templateUrl: 'views/feedback.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);
