const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    cart: {
        products: {
            type: Array,
        },
        favorite: {
            type: Array,
        },
        quantity: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
        }
    },
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);