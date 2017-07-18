'use strict';

angular.module('myService', [])
    .service('ServiceCtrl', ['$http', function($http){

        var count = 6;

        this.refresh = function(callback){
            $http({
                method: 'GET',
                url: '/infolist',
                params: {"num": 3, "skip": 's'}
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
                count = count + 3;
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
