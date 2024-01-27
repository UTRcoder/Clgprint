const express = require('express')
const router = express.Router()
const User = require('../models/User')

const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")


router.post("/createuser",

    [body('email', 'Enter proper Email').isEmail(),
    body('password', 'This password is to short').isLength({ min: 5 })],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // password encryption using "bcrypt"
        const salt = await bcrypt.genSalt(10);
        let securePass= await bcrypt.hash(req.body.password,salt);

        //JWT
        const jwt=require("jsonwebtoken");
        


        try {
            await User.create({
                name: req.body.name,
                password: securePass,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log("error in creating user")
            res.json({ success: false });
        }
    }
)
module.exports = router;