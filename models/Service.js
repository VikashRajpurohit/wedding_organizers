const mongoose = require ('mongoose');

const Service_schema = new mongoose.Schema({
    stid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Serv_type',
    },
    img:
    {
       type: String
    },
    sname: {
        type: String,
        require: true
    },
    sfees: {
        type: Number,
        require: true
    },
    slocation: {
        type: String,
        require: true
    },
    sdescription: {
        type: [String],
        requere: true
    },
    simgs: {
        type: String,
    }
}) 

module.exports = Service = mongoose.model('service',Service_schema); 