'use strict'

const express = require('express');
const router = express.Router();
const {Users} = require("../auth/models/users-model")
const bcrypt = require('bcrypt');
const basicMid = require('./middleware/basic')

router.post('/signup', signUpFunction);
router.post('/signin',basicMid, signInFunction);

async function signUpFunction(req, res) {
    let { username, password } = req.body;
  
    try {
        let hashedPassword = await bcrypt.hash(password, 5);
       
        const newUser = await Users.create({
            username: username,
            password: hashedPassword
        })
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
    }
}

async function signInFunction(req,res) {
    res.status(200).send(req.user)    
}

module.exports = router