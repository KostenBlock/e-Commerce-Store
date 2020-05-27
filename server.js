const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect DB
connectDB();

// Init middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => {
    res.json({ msg: "Welcome to the OnlineStore..."});
});

app.use('/uploads', express.static('uploads'));
app.use('/productImages', express.static('productImages'));

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/user_img', require('./routes/userImg'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));