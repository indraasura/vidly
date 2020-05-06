const mongoose = require('mongoose')

const Customers = mongoose.model('Customers', new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: String,
        require: true,
        minlength: 10,
        maxlength: 10
    }
}))

exports.Customers = Customers