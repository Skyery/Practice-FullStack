const { verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();
const Product = require('../model/Product');

// Create product
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Update
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: '該商品已被刪除!' });
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get product
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get all product
router.get('/', async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let product
        if (qNew) {
            product = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            product = await Product.find({ categories: { $in: [qCategory] } });
        } else {
            product = await Product.find();
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;