const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;

        // Check no empty
        if (email === '' || username === '' || password === '' || confirm_password === '') {
            return res.status(400).json({ msg: '欄位不得為空白!', success: false })
        }

        // Check password and confirm_password
        if (password !== confirm_password) {
            return res.status(400).json({ msg: '密碼與密碼驗證不符!', success: false })
        }

        // Check username and email for unique, custom error messages
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ msg: "使用者名稱已被註冊!", success: false })
        user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "電子信箱已被註冊!", success: false })

        // Hash password by bcrypt using Sync
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
            username: username,
            email: email,
            password: hash
        })

        const savedUser = await newUser.save();
        res.status(201).json({ savedUser, success: true });
    } catch (err) {
        res.status(500).json({ err });
    }
})

// Login
router.post('/login', async (req, res) => {
    try {
        // Check username exist
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(404).json({ msg: '使用者名稱錯誤!', success: false });

        // Check password valid
        const unHashPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!unHashPassword) return res.status(404).json({ msg: '密碼錯誤!', success: false });

        // inject JWT-Token
        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            { expiresIn: '3d' }
        )
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, token, success: true });
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;