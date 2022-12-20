const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

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

adminSchema.methods.generateAuthToken = async function () {
    const admin = this
    const token = await jwt.sign({id: admin._id}, process.env.TOKEN_KEY, {
        expiresIn: '24h',
    })
    admin.token = token
    await admin.save()
    return token
}

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin