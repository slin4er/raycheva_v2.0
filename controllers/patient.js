const Patient = require('../models/patient')

const createPatient = async (req, res) => {
    const patient = await Patient.create(req.body)
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