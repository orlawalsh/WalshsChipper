var Special = require('../models/special');
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
    // Use the Drink model to find all drinks
    Special.find(function(err, special) {
        if (err)
            res.send(err);
        else
            res.json(special);
    });
}

router.findOneSpecial = function(req, res) {

    // Use the Drink model to find a single drink
    Special.find({ "_id" : req.params.id },function(err, special) {
        if (err)
            res.json({ message: 'Special NOT Found!', errmsg : err } );
        else
            res.json(special);
    });
}


module.exports = router;