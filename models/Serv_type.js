const mongoose = require ('mongoose');

const Serv_type_schema = new mongoose.Schema({
    smid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Serv_mst'
    },
    servicetype: {
        type : String,
        require : true
    },
    date: {
        type:Date,
        default: Date.now()
    }
})

module.exports = Serv_type = mongoose.model('Serv_type',Serv_type_schema);