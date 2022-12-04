const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true
    },
    appointment: {
        type: String,
        required: true
    }
})

const Patient = mongoose.model('patient', patientSchema)

module.exports = Patient