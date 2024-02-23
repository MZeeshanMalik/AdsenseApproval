const mongoose = require('mongoose')

const AddFundSchema = new mongoose.Schema({
    amount: {
        type: String
    },
    transctionId: {
        type: String
    },
    Image: {
        type: String
    },
    user:{
        type:String
    }
})
const AddFunds = mongoose.model( 'AddFunds' ,AddFundSchema );
module.exports = AddFunds