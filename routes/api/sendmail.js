var nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "uscorein@gmail.com",
      //pass: "a=Amit111/////",
      pass: "Parthu@4911"
    },
  });

  const mailOptions = {
    from: "18bmiit079@gmail.com", // sender address
    to: req.query.email, // list of receivers
    subject: "Welcome to Wedding Organizers", // Subject line
    html:
      '<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"><div style="margin:50px auto;width:70%;padding:20px 0"><div style="border-bottom:1px solid #eee"><a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Wedding Organizers</a></div><p style="font-size:1.1em">Hello Sir/Ma\'am,</p><p>Thank you for choosing Wedding Organizer,  We feeling the joy of Serving you Best ' +
      req.query.email +
      ". message from: " +
      req.query.name +
      '</p><p style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">' +
      req.query.message +
      '</p><p style="font-size:0.9em;">Regards,<br />Project Team (Vikash,Parth)</p><hr style="border:none;border-top:1px solid #eee" /><div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"></div></div></div>', // plain text body
  };

  // @ts-ignore
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      res.status(200).send({ message: "mail sent  successfully" });
    }
  });
});
module.exports = router;
