'use strict';

angular.module('mapController', [])
    .controller('MapCtrl', ['$scope', 'ServiceCtrl', function ($scope,ServiceCtrl) {

        var marker, addr;

        //set up the map
        var myLatlng = new google.maps.LatLng(25,0);
        var mapOptions = {
            zoom: 2,
            center: myLatlng,
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
            }
        };


        var styles = {
            silver: [
                {
                    elementType: 'geometry',
                    stylers: [{color: '#f5f5f5'}]
                },
                {
                    elementType: 'labels.icon',
                    stylers: [{visibility: 'off'}]
                },
                {
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#616161'}]
                },
                {
                    elementType: 'labels.text.stroke',
                    stylers: [{color: '#f5f5f5'}]
                },
                {
                    featureType: 'administrative.land_parcel',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#bdbdbd'}]
                },
                {
                    featureType: 'poi',
                    elementType: 'geometry',
                    stylers: [{color: '#eeeeee'}]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#757575'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{color: '#e5e5e5'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#9e9e9e'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{color: '#ffffff'}]
                },
                {
                    featureType: 'road.arterial',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#757575'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{color: '#dadada'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#616161'}]
                },
                {
                    featureType: 'road.local',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#9e9e9e'}]
                },
                {
                    featureType: 'transit.line',
                    elementType: 'geometry',
                    stylers: [{color: '#e5e5e5'}]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'geometry',
                    stylers: [{color: '#eeeeee'}]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{color: '#c9c9c9'}]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#9e9e9e'}]
                }
            ],

            night: [
                {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{color: '#263c3f'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#6b9a76'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{color: '#38414e'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#212a37'}]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#9ca5b3'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{color: '#746855'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#1f2835'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#f3d19c'}]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{color: '#2f3948'}]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{color: '#17263c'}]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#515c6d'}]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{color: '#17263c'}]
                }
            ],

            retro: [
                {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
                {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
                {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
                {
                    featureType: 'administrative',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#c9b2a6'}]
                },
                {
                    featureType: 'administrative.land_parcel',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#dcd2be'}]
                },
                {
                    featureType: 'administrative.land_parcel',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#ae9e90'}]
                },
                {
                    featureType: 'landscape.natural',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                },
                {
                    featureType: 'poi',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#93817c'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry.fill',
                    stylers: [{color: '#a5b076'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#447530'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{color: '#f5f1e6'}]
                },
                {
                    featureType: 'road.arterial',
                    elementType: 'geometry',
                    stylers: [{color: '#fdfcf8'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{color: '#f8c967'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#e9bc62'}]
                },
                {
                    featureType: 'road.highway.controlled_access',
                    elementType: 'geometry',
                    stylers: [{color: '#e98d58'}]
                },
                {
                    featureType: 'road.highway.controlled_access',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#db8555'}]
                },
                {
                    featureType: 'road.local',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#806b63'}]
                },
                {
                    featureType: 'transit.line',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                },
                {
                    featureType: 'transit.line',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#8f7d77'}]
                },
                {
                    featureType: 'transit.line',
                    elementType: 'labels.text.stroke',
                    stylers: [{color: '#ebe3cd'}]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry.fill',
                    stylers: [{color: '#b9d3c2'}]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#92998d'}]
                }
            ]
        };


        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        map.setOptions({styles: styles.silver, minZoom: 2, maxZoom: 15});


        $scope.$watch(function() { return ServiceCtrl.shared.mapValue; }, function(newVal) {
            map.setOptions({styles: styles[newVal], minZoom: 2, maxZoom: 15});
        }, true);


        //getting cities and countries from database
        $scope.places = [];
        $scope.lat = []; // declaration for 2D array
        $scope.lng = [];

        var contentString;
        var latlngset;

        ServiceCtrl.getLocation(function(response){
            $scope.places = response;
            var infowindow = new google.maps.InfoWindow();
            var geocoder= new google.maps.Geocoder();
            var content;
            var lat;
            var lng;

            console.log($scope.places.length);

            for(var j = 0; j < $scope.places.length; j++){
                addr = $scope.places[j].city + ", " + $scope.places[j].country;
                // console.log(addr);
                content = addr;

                geocoder.geocode({
                    'address': addr
                }, function(results, status){
                    if (status == google.maps.GeocoderStatus.OK) {
                        lat=results[0].geometry.location.lat();
                        lng=results[0].geometry.location.lng();
                        latlngset = new google.maps.LatLng(lat, lng);
                        contentString = addr;
                         marker = new google.maps.Marker({
                            position: latlngset
                        });
                        marker.setMap(map);

                        google.maps.event.addListener(marker, 'click', (function(marker, content) {
                            return function() {
                                infowindow.setContent(content);
                                infowindow.open(map, marker);
                            }
                        })(marker, content));
                    }});
            }



        }); //end of getLocation


    }]);
