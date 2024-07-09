const mongoose = require("mongoose")
const {Schema} = mongoose;

const BloodRecievedSchema = new Schema({
    DId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor'
    },
    BBid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BloodBanks'
    },
    BloodDonatedQty: {
        type: Number,
        required: true
    },
    BGroup: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    HId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    },
})

module.exports = mongoose.model('BloodRecieved', BloodRecievedSchema) 