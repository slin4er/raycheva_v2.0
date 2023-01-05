const connectDB = require("./db/connect");
const app = require('./app')
require('dotenv').config()
const port = process.env.PORT || 3000

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

start().catch((error) => {
    console.log(error)
})