const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

//Customer Registration Model
const cust_reg = require("../../models/cust_reg");

//@route POST api/customer_registration
//@desc Register Customer
//@access Public

router.post(
  "/",

  //Using async
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // @ts-ignore
    console.log(req.session.otp);
    console.log(req.body.otp);
    // @ts-ignore
    if (bcrypt.compareSync(req.body.otp, req.session.otp)) {
      const salt = await bcrypt.genSalt(10);
      let user = new cust_reg({
        c_name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        dob: req.body.dob,
        address: req.body.address,
        city: req.body.DDCity,
        state: req.body.DDState,
        Identification_proof_type: req.body.Identification_Proof_Type,
        Identification_proof: req.body.Identification_Proof,
        password: await bcrypt.hash(req.body.password, salt),
      });

      try {
        console.log(user);
        //See if User exits
        let cust = await cust_reg.findOne({ email: req.body.email });
        let con = await cust_reg.findOne({ contact: req.body.contact });

        if (cust) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User alraedy exists" }] });
        }
        if (con) {
          console.error(con);
          return res
            .status(400)
            .json({ errors: [{ msg: "contact alraedy exists" }] });
        }

        //get Users gravatar
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm", //404
        });
        //Encrypt Password using bcrypt
        //more you have more you secure

        user.save();

        //Return Jsonwebtoken
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token }); //to get id
          }
        );

        // res.send("Customer Registration route");//to print value
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    } else {
      res.status(400).send("otp error");
    }
  }
);

module.exports = router;
