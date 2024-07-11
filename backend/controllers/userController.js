const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');


//Signup Controller
const signupController = expressAsyncHandler( async(req, res) => {
    const {name, email, password, image} = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the details");
    }

    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(400);
        throw new Error("User already Exists");
    }

    const user = await User.create({
        name, email, password, image
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email, 
            image: user.image,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Could not create User");
    }
});


// Login Controller
const loginController = expressAsyncHandler( async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email, 
            image: user.image,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Could not login user");
    }
});


//All User Controller
const allUsersController = expressAsyncHandler( async(req, res) => {
    const keyword = req.query.search ? {
        $or: [
            {name: {$regex: req.query.search, $options: "i"} },
            {email: {$regex: req.query.search, $options: "i"} },
        ] 
    } : {};

    const users = await User.find(keyword).find({_id: {$ne: req.user._id}});
    res.send(users);
});

module.exports = {loginController, signupController, allUsersController};