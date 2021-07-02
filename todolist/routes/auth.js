const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('../models/User')

// @route POST api/auth/register
// @desc Register user
// @access public
router.post('/register', async(req, res) => {
    const {username, password} = req.body

    // Simple validation
    if(!username || !password)
    {
        return res
        .status(400)
        .json({
            success: false,
            message: 'Missing username or password'
        })
    }
    try {
        //Check for existing user
        const user = await User.findOne({username})
        if(user)
        {
            return res
            .status(400)
            .json({
                success: false,
                message: 'Username already exists'
            })
        }

    
        //Good
        const hashedPassword  = await argon2.hash(password)
        const newUser = new User({
            username,
            password: hashedPassword
        })
        await newUser.save()

        // Return token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: 'User created successfully',
            accessToken
        })
    }catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal sever error'
        })
    }
})

// @route POST api/auth/logib
// @desc Login user
// @access public
router.post('/login', async(req, res)=>{
    const {username, password} = req.body

     // Simple validation
     if(!username || !password)
     {
         return res
         .status(400)
         .json({
             success: false,
             message: 'Missing username or password'
         })
     }
     try {
         //Check for existing user
        const user = await User.findOne({username})
        if(!user)
            return res.status(400).json({
                success: false,
                message: 'Incorrect username or password'
            })

         //Username found
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid)
            return res.status(400).json({
            success: false,
            message: 'Incorrect username or password'
            })

         //Good
         // Return token
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: 'User logged in successfully',
            accessToken
        })
     } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal sever error'
        })   
     }
     
})



module.exports = router