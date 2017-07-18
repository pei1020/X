'use strict';

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('infolist', ['infolist']);
var connect  = require('connect');
var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// app.get('/infolist', function(req, res) {
//     console.log('received a GET request');
//     db.infolist.find({}, function(err, lists){
//         res.json(lists);
//     });
// });

//get a specific document
app.get('/infolist/:id', function(req, res){
    console.log('received a specific GET request');
    var id = req.params.id;
    console.log(req.params);
    db.infolist.findOne({_id: mongojs.ObjectId(id)}, function (err, lists) {
        res.json(lists);
    });
});

//get the a restricted number of documents, showing the latest at the top
app.get('/infolist', function(req, res){

    var count;

    if(req.query.skip === 'n'){
        console.log('with city and country');
        db.infolist.find({$or:[{"city": {$exists:true}},{"country": {$exists:true}}]}, function(err, lists){
        res.json(lists);
    });
    }

    else{
        count = req.query.num;
        db.infolist.aggregate({$sort: {_id: -1}}, {$limit: + count}, function (err, lists) {
            res.json(lists);
        });
    }

    // console.log(req.query.num)
    // console.log(count);




});

//inserting new
app.post('/infolist', function(req, res){
    // console.log('POST request');
    db.infolist.insert(req.body, function(err,lists){
        res.json(lists);
    });
});

//updating
app.put('/infolist/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.infolist.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {$set: {firstName: req.body.firstName, lastName: req.body.lastName, date: req.body.submissionDate, feedback: req.body.feedback}},
            new: true}, function (err, lists) {
            res.json(lists);
        }
    );
});


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
