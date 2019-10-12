const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Product Schema

const ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },

    price: {
        type:String,
        required:true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true
    }
});


module.exports = Product = mongoose.model('products', ProductSchema);