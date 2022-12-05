const mongoose = require('mongoose')
const nodemailer = require("nodemailer");
require('dotenv').config()

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
    },
    time: {
        type: String,
        required: true
    }
})

patientSchema.methods.toJSON = function() {
    const obj = this.toObject()
    delete obj.password
    return obj
}

const Patient = mongoose.model('patient', patientSchema)

module.exports = Patient