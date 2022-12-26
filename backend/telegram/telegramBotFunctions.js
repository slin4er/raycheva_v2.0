const {Keyboard} = require("telegram-keyboard");
const Patient = require("../models/patient");
const {timeAvailable} = require("../controllers/patient");
const Calendar = require("telegraf-calendar-telegram");

const createButtons = (buttonsArray) => {
    if(buttonsArray.length === 1) {
        return Keyboard.make([
            [buttonsArray[0]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 2) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 3) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 4) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 5) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]],
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 6) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 7) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 8) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 9) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 10) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 11) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 12) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]], [buttonsArray[11]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 13) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]], [buttonsArray[11]],
            [buttonsArray[12]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 14) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]], [buttonsArray[11]],
            [buttonsArray[12]], [buttonsArray[13]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 15) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]], [buttonsArray[11]],
            [buttonsArray[12]], [buttonsArray[13]], [buttonsArray[14]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 16) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]], [buttonsArray[11]],
            [buttonsArray[12]], [buttonsArray[13]], [buttonsArray[14]], [buttonsArray[15]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 17) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]], [buttonsArray[11]],
            [buttonsArray[12]], [buttonsArray[13]], [buttonsArray[14]], [buttonsArray[15]],
            [buttonsArray[16]]
        ]).oneTime().reply()
    }
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