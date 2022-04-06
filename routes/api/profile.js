const express = require('express');
const router = express.Router();

//@route    Get api/Post
//@desc     Test Route
//@access   public

router.get('/',(req,res) => res.send("Profile route...."));

module.exports = router;
