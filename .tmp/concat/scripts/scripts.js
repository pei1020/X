'use strict';

/**
 * @ngdoc function
 * @name desktopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the desktopApp
 */
angular.module('myController', [])
  .controller('MainCtrl', ['$scope', function ($scope) {
      $scope.str = "Hello World!";


      $scope.radioData = [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
          { label: '4', value: 4 },
          { label: '5', value: 5 }
      ];

      $scope.feedbacklists = [
          { First: 'Patty',
              Last: 'Liu',
              Date: '07/04/2017',
              Feedback: 'Easy to use!'
          },
          {
              First: 'Donald',
              Last: 'Jump',
              Date: '06/30/2017',
              Feedback: 'Mediocre...'
          }
      ];



      $scope.add = function (user){
          $scope.feedbacklists.push({
                First: user.firstName,
                Last: user.lastName,
                Date: user.submissionDate,
                Feedback: user.feedback
          });

          // var newinfo = {
          //     First: user.firstName,
          //     Last: user.lastName,
          //     Date: user.submissionDate,
          //     Feedback: user.feedback
          // };
          //
          // $scope.saving = true;
          // $scope.store.insert(newinfo)
          //     .then(function success(){
          //         $scope.newinfo = '';
          //     })
          //     .finally(function(){
          //         $scope.saving = false;
          //     });

          this.userForm.$setUntouched();
          this.user = [];
          this.userForm.$setPristine();

      };
  }]);

// var mongoose = required('mongoose');
// var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/test');
//
// //defining schema
// var userSchema = new Schema({
//     firstname: String,
//     lastname: String,
//     created_at: Date,
//     feedback: String
//     }
// );
//
//
// //create a model using the user
// var User = mongoose.model('User', userSchema);
//
//
// //find all
// User.find({}, function(err, users){
//     if(err) throw err;
//
//     console.log(users);
// })
//
// //make this available to our users in the Node app
// module.exports = User;
'use strict';

angular.module('myService', [])
    .factory('ServiceCtrl', ['$http', function($http){
            return $http.get('infoStorage');
        }])
    .factory('api', ['$resource', function ($resource) {

        var store = {
            information: [],

            api: $resource('/api/information/:id', null,
                {
                    update: { method:'PUT' }
                }
            ),


            get: function () {
                return store.api.query(function (resp) {
                    angular.copy(resp, store.information);
                });
            },

            insert: function (info) {
                var originalInfo = store.information.slice(0);

                return store.api.save(info,
                    function success(resp) {
                        info.id = resp.id;
                        store.information.push(info);
                    }, function error() {
                        angular.copy(originalInfo, store.information);
                    })
                    .$promise;
            },

            put: function (info) {
                return store.api.update({ id: info.id }, info)
                    .$promise;
            }
        };

        return store;
    }]);
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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

angular.module('desktopApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"jumbotron\"> <h1>'Allo, 'Allo!</h1> <p class=\"lead\"> <img src=\"images/yeoman.png\" alt=\"I'm Yeoman\"><br> Always a pleasure scaffolding your apps. </p> <p><a class=\"btn btn-lg btn-success\" ng-href=\"#/\">Splendid!<span class=\"glyphicon glyphicon-ok\"></span></a></p> </div> <div class=\"row marketing\"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>"
  );

}]);
