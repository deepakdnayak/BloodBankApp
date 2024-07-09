const mongoose = require("mongoose")
const {Schema} = mongoose;

const BloodInventorySchema = new Schema({
    BBid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BloodBanks'
    },
    APlusStock: {
        type: Number,
        required: true
    },
    AMinusStock: {
        type: Number,
        required: true
    },
    BPlusStock: {
        type: Number,
        required: true
    },
    BMinusStock: {
        type: Number,
        required: true
    },
    OPlusStock: {
        type: Number,
        required: true
    },
    OMinusStock: {
        type: Number,
        required: true
    },
    ABPlusStock: {
        type: Number,
        required: true
    },
    ABMinusStock: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('BloodInventory', BloodInventorySchema) 