var mongoose = require('mongoose');

var MenuSchema = new mongoose.Schema({
    category: {
        type: String,
        index: true
    },
    name : {
        type: String
    },
    quantity : {
        type: Number
    },

    price : {
        type: Number
    }
});
const Menu = module.exports = mongoose.model('Menu', MenuSchema);