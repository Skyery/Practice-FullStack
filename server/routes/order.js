const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();
const Order = require('../model/Order');

// Create order
router.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Update
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: '該訂單已被刪除!' });
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get user order
router.get('/find/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get all orders
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;