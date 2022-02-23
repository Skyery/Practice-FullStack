require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialice APP
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database config
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => console.log(`Database connected successfully ${process.env.MONGO_URL}`))
    .catch((err) => console.log(`Unable to connect with the database ${err}`))

// Routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order');
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);

// Handle Build Path
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}
else {
    app.get('/', (req, res) => res.send('Api running'));
}

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));