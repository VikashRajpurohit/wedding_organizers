const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const Package = require('../../models/Package');
const auth = require('../../middleware/auth');
const Payment = require('../../models/payment');


router.post('/',
async (req, res) => {

    try{
    const {usid,pkgid,paymentid,datetime} = req.body;

    payment = new Payment ({
        usid,pkgid,paymentid,datetime
    });

    const decoded = jwt.verify(usid, config.get('jwtSecret'));
    
    const decoded2 = jwt.verify(pkgid, config.get('jwtSecret'));
    req.user=decoded.user;

    payment.usid = decoded.user.id

    payment.pkgid = decoded2.package.id
    
    const payload = {
        payment:{
            id: payment.id
        }
    }

    payment.save();
    jwt.sign(payload, config.get('jwtSecret'),
    {expiresIn: 360000},
    (err,token)=>{
       // if(err)throw err;
            res.json({token});
    });

   
} catch (error) {
   console.error(error.message);
   res.status(500).send('Server error....'); 
}

});


//Get all users 
router.get('/',async (req,res) => {
    try {
        const payment = await Payment.find();
        res.json(payment);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error...');    
    }});


//Get Permticular user
router.post('/getme',auth,async (req,res) => {
    try {
        let tid= req.body.id; 
        
        const decoded = jwt.verify(tid, config.get('jwtSecret'));
    
        
        const payment = await Payment.findById(decoded.payment.id);
        res.json(payment);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error...');    
    }}); 

//Delete perticular user
router.delete('/',async (req,res) =>{ 
    try {
        let tid= req.body.id; 
        
        const decoded = jwt.verify(tid, config.get('jwtSecret'));
    
        let check = await Payment.findByIdAndRemove(decoded.payment.id);
           if(check){
               res.json("Data Deleted Successfully")
           } 
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});    
module.exports = router;