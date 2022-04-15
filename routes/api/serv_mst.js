const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const jwt = require('jsonwebtoken');
const Serv_mst = require('../../models/Serv_mst');
const auth = require('../../middleware/auth');
const servid = require('../../middleware/service');

router.post('/',[
    check ('servicecategories','Service type is required').not().isEmpty()
],

async (req,res) =>{ 
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty)
    {
        return  res.status(400).json({errors : errors.array()});
    }    

        const {servicecategories,perperson,searchable} = req.body;
        console.log(req.body)
        try{

        let service = new Serv_mst({servicecategories,perperson,searchable});

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
        console.log(servicecategories);
        
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server error....'); 
     }
    
});


router.delete('/',async (req,res) =>{ 
    try {
        let tid= req.body.id; 
        console.log(tid);
        const decoded = jwt.verify(tid, config.get('jwtSecret'));
    
        let check = await Serv_mst.findByIdAndRemove(decoded.service.id);
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
        const user = await Serv_mst.find();
        //res.send(user);
        console.log("Abcd");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error...');    
    }});


    router.post('/getme',servid,async (req,res) => {
        try {
            const user = await Serv_mst.findById(req.service.id);
            res.json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error...');    
    }});

module.exports = router;