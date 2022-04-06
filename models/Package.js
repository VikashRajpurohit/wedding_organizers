const mongoose = require ('mongoose');

const Package_schema = new mongoose.Schema({
    usid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    pname: {
        type: String,
        require: true
    },
    sid: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'service'
    },
    no_guest: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        //requere: true
    },
    discount: {
        type: Number,
        default: 0,
        max:100
    }
}) 

module.exports = Pkg = mongoose.model('package',Package_schema); 