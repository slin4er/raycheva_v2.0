//Declarations and Requires
const express = require('express')
require('express-async-errors')
const app = express()
require('dotenv').config()
const errorHandler = require('./middlewares/error-handler')
const wrongRoute = require('./middlewares/wrongRoute')
const patientRoute = require('./routes/patient')
const adminRoute = require('./routes/admin')
const cors = require('cors')
require('./telegram/telegramBot')

//Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/v1', patientRoute)
app.use('/api/v1/admin', adminRoute)

//Error-handler and not existing routes
app.use(errorHandler)
app.use(wrongRoute)

module.exports = app
