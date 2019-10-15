const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Product Schema

const PurchaseSchema = new Schema({
    clientName: {
        type: String,
        required:true
    },
    clientPhone: {
        type: String,
        required:true
    },
    clientAddress: {
        type: String,
        required: true
    },
    productName:{
        type: String,
    },
    productPrice:{
        type: String,
        require: true
    },
});


module.exports = Purchase = mongoose.model('purchases', PurchaseSchema);