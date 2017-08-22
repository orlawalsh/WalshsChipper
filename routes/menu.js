var Menu = require('../models/menu');
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
    // Use the Chicken model to find all chickens
    Menu.find(function(err, menu) {
        if (err)
            res.send(err);
        else
            res.json(menu);
    });
}

router.findOne = function(req, res) {

    // Use the Chicken model to find a single chicken
    Menu.find({ "_id" : req.params.id },function(err, menu) {
        if (err)
            res.json({ message: 'Item NOT Found!', errmsg : err } );
        else
            res.json(menu);
    });
}

module.exports = router;