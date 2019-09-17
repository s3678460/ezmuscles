const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const products = require('./routes/api/products');


const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.get('/',(req,res) => res.send('Hello World'));

// Use Routes
app.use('/api/users',users);
app.use('/api/products',products);



const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server running on port ${port}`));


