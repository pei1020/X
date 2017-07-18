'use strict';

angular.module('mapController', [])
    .controller('MapCtrl', ['$scope', 'ServiceCtrl', function ($scope, ServiceCtrl) {

        var marker, addr;
        var locations = [
            ['Taipei', 25.03, 121.54, 4],
            ['Taichung', 24.09, 120.4, 4],
            ['Tainan', 23, 120.14, 4],
            ['Kaohsiung', 22.65, 120.4, 4]
        ];


        //set up the map
        var myLatlng = new google.maps.LatLng(25,0);
        var mapOptions = {
            zoom: 2,
            center: myLatlng
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);


        //getting cities and countries from database
        $scope.places = [];
        ServiceCtrl.getLocation(function(response){
            $scope.places = response;
            // console.log($scope.places.length);
            var geocoder= new google.maps.Geocoder();

            for(var j = 0; j < $scope.places.length; j++){
                addr = $scope.places[j].city + ", " + $scope.places[j].country;
                // console.log(addr);
                geocoder.geocode({
                    'address': addr
                }, function(results, status){
                    if (status == google.maps.GeocoderStatus.OK) {
                        var loc=[]; // no need to define it in outer function now
                        loc[0]=results[0].geometry.location.lat();
                        loc[1]=results[0].geometry.location.lng();

                        // console.log(loc);
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(loc[0], loc[1])
                        });
                        marker.setMap(map);
                    }
                })
            }
        });

        //geocoder




    }]);