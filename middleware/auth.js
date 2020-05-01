const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes SET REQ.USER
exports.protect = async(req, res, next) => {
    // Init token variable
    let token;
    // Header Authorization
    let headerAuth = req.headers.authorization;
    // Check html header
    if (headerAuth && headerAuth.startsWith('Bearer')) {
        // Extract the token from the header
        token = headerAuth.split(' ')[1];
    }
    // You can do also this to extract the token from the cookie
    // instead from the header
    else if (req.cookies.token) {
        token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            msg: 'Not authorized 🥺.'
        });
    }

    // Verify token
    try {
        // Extract payload
        // console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);

        //
        // ─── SET REQ USER ────────────────────────────────────────────────
        // Find the user by ID
        req.user = await User.findById(decoded.id);

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            msg: 'Not authorized 🥺.'
        });
    }

}