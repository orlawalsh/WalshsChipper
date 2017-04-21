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

router.findOne = function(req, res) {

    // Use the Drink model to find a single drink
    Special.find({ "_id" : req.params.id },function(err, special) {
        if (err)
            res.json({ message: 'Special NOT Found!', errmsg : err } );
        else
            res.json(special);
    });
}

router.addSpecial = function(req, res) {

    var special = new Special();

    special.name = req.body.name;
    special.price = req.body.price;
    special.items = req.body.items;
    special.actprice = req.body.actprice;
    special.saving = req.body.saving;


    console.log('Adding Special: ' + JSON.stringify(special));

    special.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Special Added!', data: special });
    });
}

router.deleteSpecial = function(req, res) {

    Special.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Special Deleted!'});
    });
}


module.exports = router;