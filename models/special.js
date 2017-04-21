var mongoose = require('mongoose');

var SpecialSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    price : {
        type: Number
    },
    items : {
        type: String
    },

    actprice : {
        type: Number
    },

    saving : {
        type: Number
    }
});
const Special = module.exports = mongoose.model('Special', SpecialSchema);