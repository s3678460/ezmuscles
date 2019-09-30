const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Product Schema

const ProductSchema = new Schema({
    productName:{
        type:String,
        required:true
    },

    productPrice: {
        type:String,
        required:true
    },
    productCat: {
        type: String,
        required: true,
    },
    productDesc: {
        type: String,
        required: true,
    },
    productImage: {
        type: URL,
        required: true
    }
});


module.exports = Product = mongoose.model('products', ProductSchema);