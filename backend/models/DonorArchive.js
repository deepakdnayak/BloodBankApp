const mongoose = require("mongoose")
const {Schema} = mongoose;

const DonorArchiveSchema = new Schema({
    DID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor'
    },
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
    DOB: {
        type: Date,
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
        type: Number,
        required: true
    }
    
})

module.exports = mongoose.model('DonorArchive', DonorArchiveSchema) 