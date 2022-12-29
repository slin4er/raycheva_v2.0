const {Keyboard} = require("telegram-keyboard");
const Patient = require("../models/patient");
const {timeAvailable} = require("../controllers/patient");
const Calendar = require("telegraf-calendar-telegram");

const createButtons = (buttonsArray) => {
    return Keyboard.make([
        ...buttonsArray
    ]).oneTime().reply()
}

const getArrayOfHours = async (date) => {
    const patients = await Patient.find({appointment: date})
    if(patients.length === timeAvailable.length) {
        return false
    }
    if(!patients.length) {
        return timeAvailable
    }
    const busyHours = patients.map(patient => patient.time)
    return timeAvailable.filter(hour => !busyHours.includes(hour))
}

const createPatient = async (name, phone, appointment, time) => {
    return await Patient.create({
        name,
        phone,
        appointment,
        time
    })
}

const findPatient = async (phone) => {
    const patient = await Patient.findOne({phone})
    if(!patient) {return 'Такого пациента к сожалению нет'}
    return `Ваша запись оформлена на ${patient.appointment} в ${patient.time}`
}

const getCalendar = (bot) => {
    return new Calendar(bot, {
        startWeekDay: 1,
        weekDayNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        monthNames: [
            "Янв", "Фев", "Март", "Апр", "Май", "Июнь",
            "Июль", "Авг", "Сен", "Окт", "Нояб", "Дек"
        ],
        ignoreWeekDays: [6]
    }).setMinDate(new Date())
}

module.exports = {
    createButtons,
    findPatient,
    createPatient,
    getArrayOfHours,
    getCalendar
}