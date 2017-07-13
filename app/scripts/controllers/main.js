'use strict';

/**
 * @ngdoc function
 * @name desktopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the desktopApp
 */
angular.module('myController', [])
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

      $scope.radioData = [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
          { label: '4', value: 4 },
          { label: '5', value: 5 }
      ];


      $scope.lists = [];
      var totalRating;
      var count = 6;

      var refresh = function() {
          $http({
              method: 'GET',
              url: '/infolist',
              params: {"num": 3}
          }).then(function successCallback(response) {
              count = 6;
              console.log(response);
              $scope.lists = response.data;
          });
      };

      

       refresh();


      $scope.add = function (user) {
          $http({
              method: 'POST',
              url: '/infolist',
              data: user
          }).then(function successCallback(){
              // console.log('PUT requested');
               refresh();
               // console.log($scope.lists);

          });
          this.userForm.$setUntouched();
          this.user = {}; //changed this to object from array!!!!
          this.userForm.$setPristine();

      };

      $scope.more = function() {
          $http({
              method: 'GET',
              url: '/infolist',
              params: {"num": count}
          }).then(function successCallback(response) {
              count = count + 3;
              $scope.lists = response.data;
          })

      }
  }]);
