const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')
const users = require('./routes/api/users');
const products = require('./routes/api/products');
const contacts = require('./routes/api/contacts')
const purchases = require('./routes/api/purchases')
const path = require('path')

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));



// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/contacts', contacts);
app.use('/api/purchases', purchases);

// Server static assets if in production
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
    })
}


// Serve static assets if in production

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));


