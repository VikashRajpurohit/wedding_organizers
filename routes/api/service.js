const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const jwt = require('jsonwebtoken');
const Service = require('../../models/Service');
const servid = require('../../middleware/service');


router.post('/',servid,[
    
    check('stid','Service id is required.').not().isEmpty(),
    check('sname',"Name of service is required.").not().isEmpty(),
    check('sfees',"Fees for the service is to be mentioned.").not().isEmpty(),
    check('slocation','Location for the service is to be mentioned.').not().isEmpty(),
    check('sdescription','Description for the Service is required.').not().isEmpty()
],
async (req,res) =>{ 
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty)
    {
        return  res.status(400).json({errors : errors.array()});
    }    

    
    if (!req.files) {
        console.log(req.files);
        return res.send(`Please Upload a file`);
      
    }
  
    const file = req.files.file;
    console.log("photoname " + file.name);
    console.log(req.body.sname)
  
    //Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return res.send("Please upload an image");
    }
  
    //Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return res.send("Please upload an image less than" +process.env.MAX_FILE_UPLOAD )
      
    }
  
    //Create Custom filename
    file.mv(`${"./public/uploads"}/${file.name}`, async (err) => {
      if (err) {
        console.error(err);
        return res.send("File Upload Problem");
      }
    });

    const {
        stid,
        sname,
        img,
        sfees,
        slocation,
        sdescription
    }=req.body;

    
    let service = new Service({stid,sname,sfees,img,slocation,sdescription});
    service.sdescription = sdescription.split(",");
    service.stid=req.service.id;
    service.img=file.name
 
    await service.save();

    const payload = {
        service: {
            id: service.id
        }
    }
    jwt.sign(payload, config.get('jwtSecret'),
    {expiresIn: 360000},
    (err,token)=>{
        if(err)throw err;
            res.json({token});
    });
   
})


router.post('/update',servid,
    async(req,res)=>{

        const {
            stid,
            sname,
            sfees,
            slocation,
            sdescription
        }=req.body;
      
        let service = new Service({stid,sname,sfees,slocation,sdescription});
        service.sdescription = sdescription.split(",");
        try {
                console.log(await req.service.id)
             let check = await Service.findByIdAndUpdate(
                  req.service.id,
                  { $set:{ 
                      sname:service.sname,
                      sfees:service.sfees,
                      slocation:service.slocation,
                      sdescription:service.sdescription
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




    router.post('/getme',servid,async (req,res) =>{ 
        try {
    
            let check = await Service.findById(req.service.id);
               if(check){
                   res.json(check)
               }
               else{
                res.json("Not found") 
               } 
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    
    });
    

router.delete('/',servid,async (req,res) =>{ 
    try {

        let check = await Service.findByIdAndRemove(req.service.id);
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
        const users = await Service.find();


        
        const levenshteinDistance = (str1 = '', str2 = '') => {
            const track = Array(str2.length + 1).fill(null).map(() =>
            Array(str1.length + 1).fill(null));
            for (let i = 0; i <= str1.length; i += 1) {
                track[0][i] = i;
            }
            for (let j = 0; j <= str2.length; j += 1) {
                track[j][0] = j;
            }
            for (let j = 1; j <= str2.length; j += 1) {
                for (let i = 1; i <= str1.length; i += 1) {
                    let indicator = 0 ;
                    if(str1[i - 1] === str2[j - 1] || str2[j - 1] === null)
                    {
                        indicator = 0;
                    }
                    else{
                        indicator = 1;
                    }
                    
                    track[j][i] = Math.min(
                        track[j][i - 1] + 1, // deletion
                        track[j - 1][i] + 1, // insertion
                        track[j - 1][i - 1] + indicator, // substitution
                    );
                }
            }
            return track[str2.length][str1.length];
            };
            
        users.forEach(function(user) {
            const str1 = user.sname;
            const str2 = "Royal ker thali";
            const str3 = str2.toUpperCase();
            const str4 = str1.toUpperCase();
            console.log(levenshteinDistance(str4, str3));
           
            
            console.log(str1+str2)
          });
          

        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error...');    
    }});


    router.post('/img',
    async (req,res) => {
        
        })
      
        //   const post = new JP_Normal_Post({
        //     : req.body.company_id,
        //     description: req.body.description,
        //     photo: file.name
        //   });
      
        //   post
        //   .save()
        //   .then(() => res.json("New Post Added"))
        //   .catch((err) => res.status(400).json(`Error: ${err}`));
        // }
    


module.exports = router;