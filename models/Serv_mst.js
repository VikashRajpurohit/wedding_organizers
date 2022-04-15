const { numberParser } = require('config/parser');
const mongoose = require('mongoose');

const Serv_schema = new mongoose.Schema({
    servicecategories : {
        type : String, 
        require : true
    },
    searchable : {
        type : String,
        default : 0
    },
    perperson: {
        type : String,
        default : 0

    },
    date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = Serv_mst = mongoose.model('Serv_mst',Serv_schema);