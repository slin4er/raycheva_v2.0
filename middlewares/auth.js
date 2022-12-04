const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
require('dotenv').config()

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'].replace('Bearer ', '')
    if(!token) {throw new Error('Token must be provided')}
    try {
        const decoded = await jwt.verify(token, process.env.TOKEN_KEY)
        const admin = await Admin.findById(decoded.id)
        if(!admin) {throw new Error('Not Found!')}
        if(admin.token !== token) {throw new Error('Unauthorized!')}
        req.token = token
        req.admin = admin
        return next()
    } catch (err) {
        res.status(401).json({message:'Unauthorized!'})
    }
}

module.exports = verifyToken