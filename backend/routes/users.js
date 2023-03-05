const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");

// register

router.post("/register", async (req, res) => {
    try {
        // generate new password

        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        //save user and send response

        const savedUser = await newUser.save();
        res.status(200).json(savedUser._id)
    }
    catch (err) {
        res.status(500).json(err)
    }
})


// login

router.post("/login", async (req, res) => {
    try {
        //find user
        const user = await User.findOne({ username: req.body.username })
        //if not found then
        if(!user) {return res.status(400).json("Wrong username or password")}

        //validate pasword
        const validPass = await bcrypt.compare(req.body.password, user.password)
        //if not correct then
        if(!validPass) {return res.status(400).json("Wrong username or password")}

        //send user if everything is okay
         return res.status(200).json({ _id: user._id, username: username })

    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router