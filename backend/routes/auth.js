const express = require('express');
const router = express.Router();
const emailvalidator = require('email-validator')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/Users')
const fetchuser = require('../middleware/fetchuser')

// SignUp Endpoint
router.post('/signup', async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            res.status(400).send("Input Fields Cannot Be Empty!!!");
        }
        else if (!emailvalidator.validate(req.body.email)) {
            res.status(400).send("Please Give A Valid Email!!!");
        }
        else if (await User.findOne({ email: req.body.email })) {
            res.status(400).send("Corresponding Email Of the User Already Exists!!!");
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const newpassword = await bcrypt.hash(req.body.password, salt);

            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: newpassword
            });

            const token = jsonwebtoken.sign({ userid: user._id }, process.env.jwt_secret);
            res.status(200).json({ "token":token, "name":user.name });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// Login Endpoint
router.post('/login', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).send("Input Fields Cannot Be Empty!!!");
        }
        else {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                res.status(400).send("Invalid Credentials!!!");
            }
            else {
                const ismatch = await bcrypt.compare(req.body.password, user.password);
                if (!ismatch) {
                    res.status(400).send("Invalid Credentials!!!");
                }
                else {
                    const token = jsonwebtoken.sign({ userid: user._id }, process.env.jwt_secret);
                    res.json({ "token":token, "name":user.name });
                }
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// Get User Details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user;
        const user = await User.findOne({ _id: userid }).select("-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports = router;