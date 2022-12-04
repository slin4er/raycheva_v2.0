const Patient = require('../models/patient')
require('dotenv').config()
const sendEmail = require('../emails/email')

//CRUD FOR PATIENTS
const createPatient = async (req, res) => {
    const patient = await Patient.create(req.body)
    sendEmail(patient, `Спасибо, ${patient.name}, что записались ко мне на прием, напоминаю, что вы должны прийти ${patient.appointment} в здесь будет время`)
    res.status(201).json({patient})
}

const getPatients = async (req, res) => {
    const patients = await Patient.find({}) || []
    if(!patients.length) {throw new Error('Have not been created yet')}
    res.status(200).json({patients})
}

const getPatient = async (req, res) => {
    const {id: patient_id} = req.params
    const patient = await Patient.findById(patient_id)
    if(!patient) {throw new Error('Not Found')}
    res.status(200).send({patient})
}

const updatePatient = async (req, res) => {
    const {id: patient_id} = req.params
    const patient = await Patient.findByIdAndUpdate(patient_id, req.body, {new: true})
    if(!patient) {throw new Error('Not Found')}
    sendEmail(patient, `Спасибо, ${patient.name}, что записались ко мне на прием, напоминаю, что ваша запись была перенесена на ${patient.appointment} в здесь будет время`)
    res.status(201).json({patient})
}

const deletePatient = async (req, res) => {
    const {id: patient_id} = req.params
    const patient = await Patient.findByIdAndDelete(patient_id)
    if(!patient) {throw new Error('Not Found')}
    res.status(200).json('Deleted')
}

module.exports = {
    createPatient,
    getPatient,
    getPatients,
    updatePatient,
    deletePatient
}