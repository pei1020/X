'use strict';

angular.module('myService', [])
    .service('ServiceCtrl',  ['$http', '$rootScope', function($http, $rootScope){

        var count = 8;

        this.shared = {
            "mapValue": ""
        };


        this.data = {
            "flag": false
        };


        this.refresh = function(callback){
            $http({
                method: 'GET',
                url: '/infolist',
                params: {"num": 4, "skip": 's'}
            }).then(function successCallback(response) {
                // count = 6;
                callback(response.data);
            });
        };

        this.add = function(user){
            $http({
                method: 'POST',
                url: '/infolist',
                data: user
            }).then(function successCallback(){
                // console.log($scope.lists);

            });

        };

        this.more = function(callback){

            $http({
                method: 'GET',
                url: '/infolist',
                params: {"num": count, "skip": 's'}
            }).then(function successCallback(response) {
                count = count + 4;
                callback(response.data);
            });
        };


        this.getLocation = function(callback){
            $http({
                method: 'GET',
                url: '/infolist',
                params: {"skip": 'n'}
            }).then(function successCallback(response){
                callback(response.data);
            })
        }


    }]);
