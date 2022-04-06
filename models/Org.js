const mongoose = require ('mongoose');

const Org_schema = new mongoose.Schema({
    usid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    orgName: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    doi: {
        type: String,
        require: true
    },
    acno: {
        type: String,
        requere: true
    },
    gstin: {
        type: String,
        requere: true
    },
    varified: {
        type: Boolean,
        default: 0
    },
    logoImg: {
        type: String
    }
}) 

module.exports = Org = mongoose.model('organization',Org_schema); 