const express=require('express');
const User = require('../models/User')
const bycrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const router = express.Router()

router.post('/register', async(req, res) => {
    try {
        console.log(req.body)
        const { Name, Email, Password } = req.body;
        if (!Name || !Email || !Password) {
            return res.status(400).json({ msg: "Please enter all fields" })
        }
        if (Password.length < 6) {
            return res.status(400).json({ msg: "Password should be  consist of 6 words" })
        }

        const isexist = await User.findOne({ Email })
        if (isexist) {
            return res.status(400).json({ msg: "User already exists" })
        }

        const newuser = new User({
            Name,
            Email,
            Password
        })
    bycrypt.genSalt(10,(_err,salt)=>{
        bycrypt.hash(newuser.Password,salt,async(err,hash)=>{
         if(err)throw err;
         newuser.Password=hash;
         const saveduser=await newuser.save();
          res.json({
            id:saveduser.id,
            name:saveduser.Name,
            email:saveduser.Email
          });
        });
    });


    } catch (error) {
      res.status(400).json({error:error.message})
    }
})

module.exports = router