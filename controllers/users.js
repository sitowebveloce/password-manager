const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

//
// ─── SIGNUP ─────────────────────────────────────────────────────────────────────
// /user/signup
exports.signup = async(req, res, next) => {
    const { email, password } = req.body;

    // Check if the email user already exist
    let query = await User.find({ email: email });
    let user = query;
    //console.log(user, email)

    // If match
    if (user.length > 0) {
        return res.status(400).json({
            success: false,
            data: { msg: '⚠️ Email already exist.' }
        });
    }

    //
    // ─── PASSWORD HASH FUNCTION ─────────────────────────────────────────────────────
    // Encrypt password
    bcryptjs.genSalt(10, function(err, salt) {
        if (err) throw err;
        bcryptjs.hash(password, salt, function(err, hash) {
            if (err) throw err;
            // Store hash in your password DB.
            if (hash) {
                User.create({
                    email: email,
                    username: email,
                    password: hash
                }, (err, user) => {
                    if (err) throw err;
                    //console.log(user);

                    // Create Token with JWT
                    if (user) {
                        // Create a token
                        // let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                        //     expiresIn: process.env.JWT_EXP
                        // });
                        // if (token) {
                        //     // Return 200 with the token
                        //     res.status(200).json({
                        //         success: true,
                        //         token: token
                        //     });
                        // }

                        // USE EXTERNAL FUNCTION TO SEND THE COOKIE
                        sendTokenResponse(user, 200, res);
                    }
                });
            }
        });
    });
}

//
// ─── LOGIN ──────────────────────────────────────────────────────────────────────
// /user/login
exports.login = async(req, res, next) => {
    const { email, password } = req.body;

    // Validator
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            msg: 'Provide email or password 🥺.'
        });
    }
    // Check if the email exist
    let query = await User.findOne({ email: email }).select('+password');
    let user = query;
    if (!user) {
        return res.status(401).json({
            success: false,
            msg: 'Invalid credential 🥺.'
        });
    }
    // ─── COMPARE PASSWORD ───────────────────────────────────────────────────────────
    let comparePassword = async(password, hashDbPassword) => {
        let isMatch = await bcryptjs.compare(password, hashDbPassword);
        let chekPass = isMatch;
        // console.log(chekPass)
        if (!chekPass) {
            return res.status(401).json({
                success: false,
                msg: 'Invalid credential 🥺.'
            });
        }
        // Token and return
        // let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        //     expiresIn: process.env.JWT_EXP
        // });
        // if (token) {
        //     // Return 200 with the token
        //     return res.status(200).json({
        //         success: false,
        //         msg: `🏆 Wellcome ${user.email}`,
        //         token: token
        //     });
        // }

        // USE EXTERNAL FUNCTION TO SEND THE COOKIE
        sendTokenResponse(user, 200, res);

    }
    comparePassword(password, user.password);
}

//
// ─── LOGOUT ─────────────────────────────────────────────────────────────────────
exports.logout = async(req, res, next) => {
    // RESET COOKIE
    res.cookie('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`, {
        expires: new Date(Date.now() + 1 * 1000), //
        httpOnly: true
    });

    // RETURN 
    return res.status(200).json({
        success: true,
        msg: '✋ Bye.'
    });
}

//
// ─── WHO IS IN GET CURRENT LOGGED IN USER ─────────────────────────────────────────────────
exports.whoisin = async(req, res, next) => {
    let user = await User.findById(req.user.id);

    // RETURN
    return res.status(200).json({
        success: true,
        data: user
    });
}

//
// ─── GET TOKEN AND CREATE A COOKIE AND SEND RESPONSE ────────────────────────────

const sendTokenResponse = (user, statusCode, res) => {
    // Token and return
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP
    });
    // IN PRODUCTION YOU CAN ADD options.secure = true for
    // only https connections
    let options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000), // ONE DAY
        httpOnly: true
    }

    // Send cookie
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            msg: `🏆 Wellcome ${user.email}`
        });
}