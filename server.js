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

app.get('/infolist/:id', function(req, res){
    console.log('received a specific GET request');
    // var id = req.params.id;
    console.log(req.params);
    // db.infolist.findOne({_id: mongojs.ObjectId(id)}, function (err, lists) {
    //     res.json(lists);
    // });
});


app.get('/infolist', function(req, res){
    var count = req.query.num;
     console.log(count);
    db.infolist.aggregate({$sort: {_id: -1}}, {$limit: + count}, function (err, lists) {
        res.json(lists);
    });
});


app.post('/infolist', function(req, res){
    console.log(req.body);
    db.infolist.insert(req.body, function(err,lists){
        res.json(lists);
    });
});

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
