const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();
const User = require('../model/User');

// Update
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: '該用戶已被刪除!' });
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get user
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json({ others });
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get all user
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;