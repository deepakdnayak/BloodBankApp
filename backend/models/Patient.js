const mongoose = require("mongoose")
const {Schema} = mongoose;

const PatientSchema = new Schema({
    PFname: {
        type: String,
        required: true
    },
    PLname: {
        type: String,
        required: true
    },
    PAge: {
        type: Number,
        required: true
    },
    PGender: {
        type: String,
        required: true
    },
    PAdharNo: {
        type: Number,
        required: true
    },
    PBloodGroup: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    PMobile: {
        type: Number,
        required: true
    },
    HId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    },

})

module.exports = mongoose.model('Patient', PatientSchema) 