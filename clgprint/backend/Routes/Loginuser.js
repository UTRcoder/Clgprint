const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")

const { body, validationResult } = require('express-validator')
const secret_key="MyYoutubeChannelNameisUTRisgoodb";
router.post("/loginuser",

    [body('email', 'Enter proper Email').isEmail(),
    body('password', 'This password is to short').isLength({ min: 5 })],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let email = req.body.email;
            let userData = await User.findOne({ email });
            if (!userData.email) {
                return res.status(400).json({ errors: "Enter with proper credentials" });
            }

            const passCompare= await bcrypt.compare(req.body.password,userData.password)

            if (!passCompare) {
                return res.status(400).json({ errors: "Enter with proper credentials" });
            }

            const data={
                user:{
                    id:userData.id
                }
            }

            console.log("User Logged in Successfully")
            const authToken=jwt.sign(data,secret_key);
            return res.json({ success: true, authToken:authToken})
            
        } catch (error) {
            console.log("error in logging user")
            res.json({ success: false });
        }
    });

module.exports = router;