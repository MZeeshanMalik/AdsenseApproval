const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    plan:{
        type: String,
    },
    webUrl: {
        type: String
    },
    webCredetionals: {
        type: String
    },
    customer: {
        type: String
    }
});

const Order = mongoose.model('Order' , orderSchema);
module.exports = Order