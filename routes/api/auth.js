const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

//@route    Get api/auth
//@desc     Test Route
//@access   public

router.get('/', auth,async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error...');    
    }});

//@route    Post api/auth
//@desc     Authenticate user & get token
//@access   public

router.post('/', [
     check('username', 'Include a valid e-mail').isEmail(),
    check('password', 'Password muast be minimum 6 charactors').isLength({ min: 6 })
],
async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const {username,password} = req.body;

        try {
            let user = await User.findOne({ username });
            
            if (!user)
            {
               return res.status(400).json({errors: [{msg: 'invalid crea'}] });
            }

         const isMatch =await bcrypt.compare(password,user.password);

         if(!isMatch){
            res.status(400).json({errors: [{msg: 'incorrect password'}] }); 
         }

            const payload = {
                user:{
                    id: user.id
                } 
            }

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
    }
    
});


router.post('/forgot', [
    check('username', 'Include a valid e-mail').isEmail(),
   check('password', 'Password must be minimum 6 charactors').isLength({ min: 6 }),
   check('newpass', 'Password must be minimum 6 charactors').isLength({ min: 6 })
],
async (req, res) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }
   else {
       const {username,password} = req.body;

       try {
           let user = await User.findOne({ username });
           
           if (!user)
           {
              return res.status(400).json({errors: [{msg: 'invalid crea'}] });
           }

        const isMatch =await bcrypt.compare(password,user.password);

        if(!isMatch){
           res.status(400).json({errors: [{msg: 'incorrect password'}] }); 
        }else{

            const salt = await bcrypt.genSalt(10);
            let np = await bcrypt.hash(req.body.newpass,salt);
           

            try {
                let check = await User.findOneAndUpdate(
                  {username :user.username },
                  { $set:{      password:np
                    }
                    },
                  { new: true}
                );
                return res.json(check);
                
              } catch (err) {
                console.error(err.message);
                return res.status(500).send('Server Error');
              }
        }

           const payload = {
               user:{
                   id: user.id
               } 
           }

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
   }
   
});


module.exports = router;   
