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
         address_street :{
            type : String,
            required : true
        },
        address_landmark :{
            type : String,
            required : true
        },
        address_city :{
            type : String,
            //required : true
        },
        address_state :{
            type : String,
            //required : true
        },
        address_pincode:{
            type : String,
            //required : true
        },
   
    subcaste : {
        type : String,
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
    },
    role : {
        type : String
    }

});

module.exports = User = mongoose.model('user',UserSchema);

