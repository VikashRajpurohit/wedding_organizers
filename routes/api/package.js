const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');
const Package = require('../../models/Package');
const packid = require('../../middleware/package');
const auth = require('../../middleware/auth');
const Service = require('../../models/Service');
const Serv_type = require('../../models/Serv_type');

    //****//
    //Create package
    router.post('/',auth,
    async (req,res) =>{ 
        
        const {
            usid,
            pname,
            sid,
            no_guest,
            discount,
            price
        }=req.body;

    try {
        
        let package = new Package({        
            usid,
            pname,
            discount,
            no_guest,
    });
        const tempsid = sid.split(",");
        
        let decoded = "";
        
        tempsid.forEach(function(token) {
            decoded = jwt.verify(token, config.get('jwtSecret'));
            package.sid.push(decoded.service.id);        
        });
        

        const servicetype =await Service
        .find({_id: package.sid })
        .populate("stid")

        let aservicetype = []
        servicetype.forEach(function(idvar){
            aservicetype.push(idvar.stid.smid);

        });

        const servicemaster = await Serv_type
        .find({smid: aservicetype})
        .populate("smid")

        let no_total = 0
        let total = 0
        for(let i = 0; i<servicemaster.length;i++){
            if(servicemaster[i].smid.perperson==0){
                no_total = servicetype[i].sfees + no_total
            }
            else{
                total=total+servicetype[i].sfees
            }
        }
        total = (((total*req.body.no_guest)+no_total)*(100-req.body.discount))/100
           
        package.price=total

        package.save();

        const payload = {
            package: {
                id: package.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'),
        (err,token)=>{
            if(err)throw err;
                res.json({token});
        });


    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error'); 
    }    
    })

    //****//
    //Get all package
    router.get('/',async (req,res) => {
        try {
            const package = await Package.find();

            let aservicetype = []
            package.forEach(function(idvar){
                aservicetype.push(idvar);
            });

            const mainreturn =await Package
            .find({id: aservicetype.id })
            .populate("sid")
        

            res.json(mainreturn);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error...');    
        }});


    //****//
    //Delete perticular package
    router.delete('/',packid,async (req,res) =>{ 
        try {
    
            let check = await Package.findByIdAndRemove(req.package.id);
               if(check){
                   res.json("Data Deleted Successfully")
               } 
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    
    });

    //****//
    //Get perticular package
    router.post('/getme',packid,async (req,res) =>{ 
        try {
            const mainreturn =await Package
            .findById(req.package.id)
            .populate("sid")
        
            
            if(mainreturn){
                
                   res.json(mainreturn)
               } else{
                res.json("not found")
               }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    
    });


module.exports = router;