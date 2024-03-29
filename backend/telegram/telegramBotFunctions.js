const {Keyboard} = require("telegram-keyboard");
const Patient = require("../models/patient");
const DisabledDates = require('../models/disabledDates')
const {timeAvailable} = require("../controllers/patient");
const Calendar = require("telegraf-calendar-telegram");

const createButtons = (buttonsArray) => {
    let firstArr = [], secondArr = [], thirdArr = [], fourthArr = [], fifthArr = []
    for(let i = 0; i < buttonsArray.length; i++) {
        if(firstArr.length !== 4) {
            firstArr.push(buttonsArray[i])
        }else if(secondArr.length !== 4) {
            secondArr.push(buttonsArray[i])
        }else if(thirdArr.length !== 4) {
            thirdArr.push(buttonsArray[i])
        }else if(fourthArr.length !== 4) {
            fourthArr.push(buttonsArray[i])
        }else if(fifthArr.length !== 4) {
            fifthArr.push(buttonsArray[i])
        }
    }
    const checkOnUndefined = [firstArr,secondArr,thirdArr,fourthArr,fifthArr]
    const buttons = checkOnUndefined.filter((arr) => arr !== [])
    return Keyboard.make([
        ...buttons
    ]).resize().oneTime().reply()
}

const addThisDateIntoDisabledDates = async (date) => {
    const patientsOnThisDate = await Patient.find({appointment: date})
    if(patientsOnThisDate.length === timeAvailable.length) {
        await DisabledDates.create({date})
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
    const date = appointment.split('-')
    const patient = await Patient.create({
        name,
        phone,
        appointment,
        time,
        dateInSeconds: new Date(`${date[1]}/${date[0]}/${date[2]} 23:00`).getTime()
    })
    await addThisDateIntoDisabledDates(appointment)
    return patient
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