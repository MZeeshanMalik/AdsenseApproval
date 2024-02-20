const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    problem: {
        type: String
    }
});

const Contact = mongoose.model('Contact' , contactSchema);
module.exports = Contact;