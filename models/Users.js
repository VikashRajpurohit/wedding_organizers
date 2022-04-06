const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fname : {
        type: String,
        required: true  
    },
    lname : {
        type: String,
        required: true  
    },
    contact : {
        type : String,
        required: true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required: true
    },
    address : {
        street :{
            type : String,
            required : true
        },
        landmark :{
            type : String,
            required : true
        },
        city :{
            type : String,
            required : true
        },
        state :{
            type : String,
            required : true
        },
        pincode:{
            type : String,
            required : true
        }

    },
    subcaste : {
        type : String,
        required : true
    },
    d_o_b : {
        type : String,
        required : true
    },
    password : {
        type: String,
        required: true
    },
    avatar : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now 
    }

});

module.exports = User = mongoose.model('user',UserSchema);

