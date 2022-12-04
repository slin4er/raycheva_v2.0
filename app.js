//Declarations and Requires
const express = require('express')
require('express-async-errors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const errorHandler = require('./middlewares/error-handler')
const wrongRoute = require('./middlewares/wrongRoute')
const connectDB = require('./db/connect')
const patientRoute = require('./routes/patient')
const adminRoute = require('./routes/admin')

//Middlewares
app.use(express.json())

//Routes
app.use('/api/v1', patientRoute)
app.use('/api/v1/admin', adminRoute)

//Error-handler and not existing routes
app.use(errorHandler)
app.use(wrongRoute)

//Server
const start = async () => {
   try {
       await connectDB(process.env.MONGODB_URI)
       app.listen(port, () => {
           console.log(`Application is running on port ${port}`)
       })
   } catch (err) {
       console.log('Server is not running', err.message)
   }
}

start().then()