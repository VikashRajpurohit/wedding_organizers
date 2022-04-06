const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');
const Org = require('../../models/Org');
const auth = require('../../middleware/auth');

router.get('/me',auth,async (req,res) =>{ 
    try {
        const org = await Org.findOne({ user: req.user.id });


        if(!org){
            return res.status(400).json({msg:'The is Organization is not been registered with this user'});
        }

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

router.post('/',auth,
    async(req,res)=>{

        const {
            orgName,
            address,
            doi,
            acno,
            gstin,
            varified}=req.body;

            let org = new Org({orgName,address,doi,acno,gstin,varified});
            
            try {
                    org.usid = req.user.id;
                    await org.save();
                    return res.json(profile);
                
              } catch (err) {
                console.error(err.message);
                return res.status(500).send('Server Error');
              }
    })

    router.post('/update',auth,
    async(req,res)=>{

        const {
            orgName,
            address,
            doi,
            acno,
            gstin,
            varified}=req.body;

            let org = new Org({orgName,address,doi,acno,gstin,varified});
            
            try {
                profile = await Org.updateOne(
                  { usid: req.user.id },
                  { $set:{ orgName: org.orgName,
                           address: org.address,
                           doi: org.doi,
                           acno: org.acno,
                           gstin: org.gstin,
                           varified: org.varified}
                    },
                  { new: true}
                );
                    console.log(org.usid)
                return res.json(profile);
                
              } catch (err) {
                console.error(err.message);
                return res.status(500).send('Server Error');
              }
    })

    


    router.delete('/',auth,async (req,res) =>{ 
        try {
            
               let check = await Org.findOneAndRemove({ usid: req.user.id });
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
            const user = await Org.find();
            res.json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error...');    
        }});
    


module.exports = router;
    


