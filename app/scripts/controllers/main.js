'use strict';

/**
 * @ngdoc function
 * @name desktopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the desktopApp
 */
angular.module('myController', [])
  .controller('MainCtrl', ['$scope', '$http', 'ServiceCtrl', function ($scope, $http, ServiceCtrl) {


      $scope.lists = [];

      $scope.radioData = [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
          { label: '4', value: 4 },
          { label: '5', value: 5 }
      ];

      $scope.items = [
          {name: "Silver", value: "silver"},
          {name: "Retro", value: "retro"},
          {name: "Night Mode", value: "night"}
      ];

      $scope.item = {};
      $scope.item.value = "default";


      $scope.$watch("item.value", function (newValue) {
          $scope.item.value = newValue;
          // console.log($scope.item.value);
          ServiceCtrl.shared.mapValue= $scope.item.value;
          // console.log(ServiceCtrl.shared.mapValue);
      });

      //refresh the page
       ServiceCtrl.refresh(function(response){
           $scope.lists= response;
       });

      //add new activity
      $scope.add = function(user){
          ServiceCtrl.add(user);
          ServiceCtrl.refresh(function(response){
              $scope.lists = response;
          });

          this.user = {}; //changed this to object from array!!!!
          this.userForm.$setUntouched();
          this.userForm.$setPristine();
      };


      //view more
      $scope.more = function(){
          ServiceCtrl.more(function(response){
            $scope.lists = response;
          });
      };


      // $scope.add = function (user) {
      //     $http({
      //         method: 'POST',
      //         url: '/infolist',
      //         data: user
      //     }).then(function successCallback(){
      //         // console.log('PUT requested');
      //          refresh();
      //          // console.log($scope.lists);
      //
      //     });
      //     this.userForm.$setUntouched();
      //     this.user = {}; //changed this to object from array!!!!
      //     this.userForm.$setPristine();
      //
      // };

      // var refresh = function() {
      //     $http({
      //         method: 'GET',
      //         url: '/infolist',
      //         params: {"num": 3}
      //     }).then(function successCallback(response) {
      //         count = 6;
      //         console.log(response);
      //         $scope.lists = response.data;
      //     });
      // };

      // $scope.more = function() {
      //     $http({
      //         method: 'GET',
      //         url: '/infolist',
      //         params: {"num": count}
      //     }).then(function successCallback(response) {
      //         count = count + 3;
      //         $scope.lists = response.data;
      //     })
      //
      // }
  }]);
