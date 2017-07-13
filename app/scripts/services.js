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