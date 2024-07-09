const mongoose = require("mongoose")
const {Schema} = mongoose;

const DonorSchema = new Schema({
    DFname: {
        type: String,
        required: true
    },
    DLname: {
        type: String,
        required: true
    },
    DAge: {
        type: Number,
        required: true
    },
    DGender: {
        type: String,
        required: true
    },
    DAdharNo: {
        type: Number,
        required: true
    },
    DBloodGroup: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    NoOfDonations: {
        type: Number,
        required: true
    },
    DMobile: {
        type: Number,
        required: true
    },
    TotalBloodDonated: {
        type: String,
        required: true
    },
    BBid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BloodBanks'
    }
})

module.exports = mongoose.model('Donor', DonorSchema) 