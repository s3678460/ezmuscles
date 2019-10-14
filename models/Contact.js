const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Contact Schema

const ContactSchema = new Schema({ 
    
    
    phone:{
        type:String,
        default:false
    },
    date:{
        type: Date,
        default: Date.now
    },



});
  


module.exports = Contact = mongoose.model('contacts', ContactSchema);