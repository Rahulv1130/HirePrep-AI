import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import userModel from "../models/user.model.js";
import blackListTokenModel from '../models/blacklist.model.js';

/**
 * @name registerUserController
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description Register a new User (expects username, email and password)
 * @access Public
 */
async function registerUserController(req, res) {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({
            message: `Please provide ${!username ? "username" : (!password ? "password" : "email")} for Registering User`
        });
    }

    const userAlreadyExists = await userModel.findOne({
        $or : [ {username} , {email} ]
    });

    if(userAlreadyExists) {
        return res.status(400).json({
            message: `Account already exists with this ${userAlreadyExists.username === username ? "username" : "email"}`
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    });

    const token = jwt.sign(
        {id: user._id, username: user.username}, 
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}




/**
 * @name loginUserController
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description Login a User with email and password
 * @access Public
 */
async function loginUserController(req, res) {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: `${!email ? "Email" : "Password"} is required for Login`
        });
    }

    const user = await userModel.findOne({ email });
    
    if(!user) {
        return res.status(401).json({
            message: "User is not registered"
        });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    
    if(!correctPassword) {
        return res.status(401).json({
            message: "Incorrect Password. Unable to Login"
        });
    }

    const token = jwt.sign(
        { id: user._id , username: user.username },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}



/**
 * @name logoutUserController
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description Logout a User
 * @access Public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "User is not Logged in"
        });
    }

    await blackListTokenModel.create({ token });
    res.clearCookie("token");

    return res.status(200).json({
        message: "User logged out successfully"
    });
}


/**
 * @name getMeController
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description Return the information about the logged in User
 * @access Public
 */
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id);

    if(!user) {
        return res.status(400).json({
            message: "Unable to find the User"
        });
    }

    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    }) 
}

export {registerUserController, loginUserController, logoutUserController, getMeController}