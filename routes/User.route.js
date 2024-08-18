const express = require("express");
const {UserModel} = require("../models/User.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userRouter = express.Router();


userRouter.post("/register", (req, res) => {
    const {name, email, pass, age} = req.body;

    try {
        bcrypt.hash(pass, 5, async(err, hashed_pass) => {
            if(err) {
                console.log({"Err": "While hashing the password"});
            }
            else {
                const user = new UserModel({name, email, pass: hashed_pass, age})
                await user.save();    
                res.send("User Registered Successfully");
            }
        });
    } catch (err) {
        console.log("Can't register the user");
        console.log(err);
    }
});

userRouter.post("/login", async(req, res) => {
    const {email, pass} = req.body;
    try {
        const user = await UserModel.find({email})  //es6 way of doing this.
        if(user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                if(result) {
                    const token = jwt.sign({ userID: user[0]._id }, 'gupta');
                    res.send({"msg": "Login Done", "token": token})
                }
                else {
                    res.send({"Err": "Something went wrong"})
                }
            });
        } else {
            res.send("Wrong Email or Password");
        }
    } catch (err) {
        console.log("Something went wrong while login");
        console.log(err);
    }
})


module.exports = {
    userRouter
};