const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String
    }
})

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin