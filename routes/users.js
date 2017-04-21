var User = require('../models/users');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect('mongodb://owalsh:root@ds119588.mlab.com:19588/wchipper');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});

router.findAll = function(req, res) {
    // Use the User model to find all users
    User.find(function(err, users) {
        if (err)
            res.send(err);
        else
            res.json(users);
    });
}

router.findOne = function(req, res) {

    // Use the User model to find a single user
    User.find({ "_id" : req.params.id },function(err, user) {
        if (err)
            res.json({ message: 'User NOT Found!', errmsg : err } );
        else
            res.json(user);
    });
}

router.addUser = function(req, res) {

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    console.log('Adding user: ' + JSON.stringify(user));

    // Save the user and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'User Added!', data: user });
    });
}

router.deleteUser = function(req, res) {

    User.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'User Deleted!'});
    });
}


module.exports = router;