const mongoose = require ('mongoose');

const Pay_schema = new mongoose.Schema({
    usid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    pkgid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'package'
    },
    paymentid: {
        type: String,
        require: true
    },
    status:{
        type: String,
        default:"Pending"

    },
    datetime: {
        type: Date,
        default: Date.now
    }
}) 

module.exports = Payment = mongoose.model('payment',Pay_schema); 