const mongoose = require('mongoose')

const disabledDatesSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    }
})

const DisabledDates = mongoose.model('disabledDates', disabledDatesSchema)

module.exports = DisabledDates