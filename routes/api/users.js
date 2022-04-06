const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const gravator = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/Users');
const auth = require('../../middleware/auth');


//@route    Post api/user
//@desc     Register User
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
        const {fname,lname,email,contact,address,subcaste,d_o_b,password,username,} = req.body;

        try {
            let user = await User.findOne({ username });
            
            if (user)
            {
                res.status(400).json({errors: [{msg: 'Users already exists'}] });
            }


            const avatar = gravator.url(username, {
                s:'200',
                r:'pg',
                d:'mm'
            })

            user = new User({
                fname,
                lname,
                email,
                contact,
                address,
                subcaste,
                d_o_b,
                username,
                avatar,
                password
            });

            

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password,salt);
            await user.save();

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


router.delete('/',auth,async (req,res) =>{ 
    try {

        let check = await User.findByIdAndRemove(req.user.id);
           if(check){
               res.json("Data Deleted Successfully")
           } 
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});


router.post('/update',auth,
    async(req,res)=>{

        const {fname,lname,email,contact,address,subcaste,d_o_b} = req.body;


           let user = new User({
                fname,
                lname,
                email,
                contact,
                address,
                subcaste,
                d_o_b
            });
            
            try {
                let check = await User.findByIdAndUpdate(
                  req.user.id ,
                  { $set:{ 
                        fname:user.fname,
                        lname:user.lname,
                        email:user.email,
                        contact:user.contact,
                        address:user.address,
                        subcaste:user.subcaste,
                        d_o_b:user.d_o_b
                    }
                    },
                  { new: true}
                );
                return res.json(check);
                
              } catch (err) {
                console.error(err.message);
                return res.status(500).send('Server Error');
              }
    })

    router.get('/',async (req,res) => {
        try {
            const users = await User.find();

                  users.forEach(function(user) {
                    console.log(user.fname);
                  });
                  
                 
                return res.json(users)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error...');    
        }});
    


module.exports = router;
