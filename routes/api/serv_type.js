const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const jwt = require('jsonwebtoken');
const Serv_type = require('../../models/Serv_type');
const auth = require('../../middleware/auth');
const servid = require('../../middleware/service');
var mongoose = require('mongoose');

router.post('/', [
    check ('servicetype','Service type is required').not().isEmpty()
],

async (req,res) =>{ 
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty)
    {
        return  res.status(400).json({errors : errors.array()});
    }
    
    const {servicetype,smid} = req.body;
    console.log(req.body);
    try{

    let service = new Serv_type({servicetype,smid});
       service.smid=mongoose.Types.ObjectId(smid); 
        
    await service.save();
    const payload = {
        service:{
            id: service.id
        }
    }

    jwt.sign(payload, config.get('jwtSecret'),
    {expiresIn: 360000},
    (err,token)=>{
       // if(err)throw err;
            res.json({token});
    });
    console.log(servicetype);
    
}
catch (error) {
    console.error(error.message);
    res.status(500).send('Server error....'); 
 }

});

router.delete('/',async (req,res) =>{ 
    try {
        let tid= req.body.id; 
        
        const decoded = jwt.verify(tid, config.get('jwtSecret'));
    
        let check = await Serv_type.findByIdAndRemove(decoded.service.id);
           if(check){
               res.json("Data Deleted Successfully")
           } 
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});

router.get('/',async (req,res) => {
    try {
        const user = await Serv_type.find();
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error...');    
    }});

    router.post('/getme',servid,async (req,res) => {
        try {
            const user = await Serv_type.findById(req.service.id);
            res.json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error...');    
        }});


    router.post('/getss',async (req,res) => {
            try {
                const user = await Serv_type.find({"smid":req.body.s_mid});
                res.json(user);
            } catch (error) {
                console.error(error.message);
                res.status(500).send('Server Error...');    
            }});
        
           


module.exports = router;
    
