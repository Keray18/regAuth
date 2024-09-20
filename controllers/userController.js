const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

// Token Generation Function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d"})
}


// User Registration
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill all fields")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error("Invalid User data")
    }
})


// User Logging
const loginUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error("Please fill all the fields")
    }

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
        // console.log("Generated Token:", token);  
    } else {
        res.status(400)
        throw new Error("Invalid Credentials.")
    }
})


// Logged In User
const getLoggedInUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json({
      id: _id,
      name,
      email,
    });
  });

module.exports = {
    registerUser,
    loginUser,
    getLoggedInUser,
}