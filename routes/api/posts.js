const express = require('express');
const router = express.Router();

//@route    Get api/post
//@desc     Test Route
//@access   public

router.get('/',async (req, res) => {

console.log(req.cookies.otps);
});




module.exports = router;
