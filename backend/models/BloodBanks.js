const mongoose = require("mongoose")
const {Schema} = mongoose;

const BloodBanksSchema = new Schema({
    BLcNo: {
        type: String,
        required: true
    },
    BBName: {
        type: String,
        required: true
    },
    BBAddress: {
        type: String,
        required: true
    },
    BBState: {
        type: String,
        required: true
    },
    BBcity: {
        type: String,
        required: true
    },
    IsGov: {
        type: Boolean,
        required: true
    },
    BBPhone: {
        type: String,
        required: true
    },
    BBUserName: {
        type: String,
        required: true
    },
    BBPassword: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Bloodbanks', BloodBanksSchema) 