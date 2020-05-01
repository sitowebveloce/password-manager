const express = require('express');
const router = express.Router();
const Archive = require('../models/Archive');
const { protect } = require('../middleware/auth');
const jwt = require('jsonwebtoken');


//
// ─── MANAGER ────────────────────────────────────────────────────────────────────
//
router.get('/archives/:id', protect, async(req, res) => {
    let username = req.params.id;
    // console.log(req.params.id)

    let query = await Archive.find({ username: username });
    // query.sort('-createdAt');
    let sorted = query;
    // console.log(sorted)
    if (sorted.length > 0) {

        return res.status(200).json({ success: true, data: sorted })
    }
    return res.status(400).json({ success: false, data: '' })

});


//
// ─── ROUTE GET HOME ─────────────────────────────────────────────────────────────
router.post('/hashcred', protect, (req, res) => {
    let name = req.body.name;
    let username = req.body.username
    let user = req.body.user;
    let password = req.body.password;

    //
    // ─── HASH PASSWORD ──────────────────────────────────────────────────────────────

    let passEncrypted = jwt.sign({ password: password }, process.env.JWT_SECRET)
    password = passEncrypted;
    // console.log(newPass)
    // SAVE
    Archive.create({ name, username, user, password }, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, data: err })
        } else {
            return res.status(200).json({ success: true, data: data });
        }
    })
});

//
// ─── COMPARE ROUTE ──────────────────────────────────────────────────────────────
router.post('/decryptval', protect, (req, res) => {
    let token = req.body.id;
    // console.log(token)

    // Extract payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //
    res.status(200).json({
        success: true,
        data: decoded
    });
});

//
// ─── DELETE ARCHIVE ─────────────────────────────────────────────────────────────
router.get('/delarchive/:id', protect, async(req, res) => {
    let id = req.params.id;
    //console.log(id);
    let query = await Archive.findByIdAndDelete(id);
    let deleted = query;
    //console.log(deleted._id);
    if (deleted._id == id) {
        return res.status(200).json({ success: true });
    } else {
        // Reture
        res.status(400).json({
            success: false
        });
    }

});

//
// ─── EDIT ROUTE ─────────────────────────────────────────────────────────────────
router.post(('/editpass'), protect, async(req, res) => {
    // console.log(req.body);
    let id = req.body.id;
    let password = req.body.password;
    //
    // ─── HASH PASSWORD ──────────────────────────────────────────────────────────────

    let passEncrypted = jwt.sign({ password: password }, process.env.JWT_SECRET)
    password = passEncrypted;
    console.log(password)

    // Update query
    let updateQuery = await Archive.findByIdAndUpdate(id, { password: password });
    let result = updateQuery;
    console.log(result)

    if (result._id == id) {
        return res.status(200).json({
            success: true,
            data: result._id
        });
    }

    return res.status(400).json({
        success: false
    });

});

//
// ─── SEARCH ROUTE ───────────────────────────────────────────────────────────────
router.post('/searchpass', async(req, res) => {
    let searchKey = req.body.search;
    // console.log(searchKey)
    let mySearch = `^${searchKey}`;
    let query = await Archive.find({ name: { $regex: new RegExp(mySearch, "i") } });
    let results = query;
    //console.log(results);

    // Return 
    if (searchKey !== '') {
        return res.status(200).json({
            success: true,
            data: results
        });
    }
    // otherwise
    return res.status(200).json({
        success: false,
        data: []
    });

});

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────
module.exports = router;