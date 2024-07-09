const mongoose = require("mongoose")
const {Schema} = mongoose;

const HospitalSchema = new Schema({
    HLicenseNo: {
        type: String,
        required: true
    },
    HName: {
        type: String,
        required: true
    },
    HState: {
        type: String,
        required: true
    },
    HCity: {
        type: String,
        required: true
    },
    HAddress: {
        type: String,
        required: true
    },
    IsGov: {
        type: Boolean,
        required: true
    },
    HPhone: {
        type: String,
        required: true
    },
    HUserName: {
        type: String,
        required: true
    },
    HPassword: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Hospital', HospitalSchema) 