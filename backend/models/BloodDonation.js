const mongoose = require("mongoose")
const {Schema} = mongoose;

const BloodDonationSchema = new Schema({
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
    BloodWeight: {
        type: Number,
        required: true
    },
    DonationDate: {
        type: Date,
        required: true
    },
    AnyMedicalCondition: {
        type: String,
        required: true
    },
    ExpDate: {
        type: Date,
        required: true
    },
    MStaffName: {
        type: String,
        required: true
    },
    MStaffRole: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('BloodDonation', BloodDonationSchema) 