const mongoose = require('mongoose');

const EmpProfileSchema = new mongoose.Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employer'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = EmpProfile = mongoose.model('empprofile', EmpProfileSchema);