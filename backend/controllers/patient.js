const Patient = require('../models/patient')
require('dotenv').config()
const sendEmail = require('../emails/email')
const nodeCache = require('node-cache')
const {PassThrough} = require("stream");
const {Error} = require("mongoose");
const myCache = new nodeCache()
const timeAvailable = [
	'09:00',
	'09:30',
	'10:00',
	'10:30',
	'11:00',
	'11:30',
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
	'15:00',
	'15:30',
	'16:00',
	'16:30',
	'17:00',
]

//CRUD FOR PATIENTS
const createPatient = async (req, res) => {
	const patient = await Patient.create(req.body)
	if (patient.email) {
		sendEmail(
			patient,
			`Спасибо, ${patient.name}, что записались ко мне на прием, напоминаю, что вы должны прийти ${patient.appointment} в ${patient.time}`
		)
	}
	res.status(201).json({ patient })
}

const getPatients = async (req, res) => {
	const patients = (await Patient.find({})) || []
	if (!patients.length) {
		throw new Error('Have not been created yet')
	}
	res.status(200).json({ patients })
}

const getPatient = async (req, res) => {
	const { id: patient_id } = req.params
	const patient = await Patient.findById(patient_id)
	if (!patient) {
		throw new Error('Not Found')
	}
	res.status(200).send({ patient })
}

const findPatientByName = async (req, res) => {
	const { name: patient_name } = req.query
	const patientFromCache = myCache.get(patient_name)
	if (!patientFromCache) {
		const patient = await Patient.findOne({ name: patient_name })
		if (!patient) {
			throw new Error('Not Found!')
		}
		myCache.set(patient_name, patient)
		console.log('not From cache')
		res.status(200).json({ patient })
	} else {
		console.log('cached')
		res.status(200).json({ patient: patientFromCache })
	}
}

const updatePatient = async (req, res) => {
	const { id: patient_id } = req.params
	const {appointment, time} = req.body
	const patientExists = await Patient.findOne({appointment, time})
	if(patientExists) {throw new Error('Already exists')}
	if(!timeAvailable.includes(time)) {throw new Error('Unavailable time')}
	const patient = await Patient.findByIdAndUpdate(patient_id, req.body, {
		new: true,
	})
	if (!patient) {
		throw new Error('Not Found')
	}
	if (patient.email) {
		sendEmail(
			patient,
			`Спасибо, ${patient.name}, что записались ко мне на прием, напоминаю, что ваша запись была перенесена на ${patient.appointment} в ${patient.time}`
		)
	}
	res.status(201).json({ patient })
}

const deletePatient = async (req, res) => {
	const { id: patient_id } = req.params
	const patient = await Patient.findByIdAndDelete(patient_id)
	if (!patient) {
		throw new Error('Not Found')
	}
	res.status(200).json('Deleted')
}

const deleteOldPatients = async (req, res) => {
	const today = Date.now()
	const patients = await Patient.find()
	if(!patients) {throw new Error('Have not been created yet')}
	const patientsToDelete = patients.filter((patient) => {
		const day = patient.appointment.split('-')[0]
		const month = patient.appointment.split('-')[1]
		const year = patient.appointment.split('-')[2]
		return (new Date(`${month}/${day}/${year} ${patient.time}:00`)).getTime() < today
	})
	if(patientsToDelete === []) {throw new Error('No patients to delete')}
	patientsToDelete.map(async (patient) => {
		await Patient.deleteOne(patient)
	})
	res.status(200).json('OK')
}

//DATES

// date.toLocaleString()
const checkDate = async (req, res) => {
	const { date } = req.query
	if (!date) {
		throw new Error('Date must be provided as a query')
	}
	const patients = await Patient.find({ appointment: date })
	if (!patients.length) {
		res.status(200).json({ freeHours: timeAvailable })
	} else {
		if (patients.length === timeAvailable.length) {
			res.status(200).json({ freeHours: [] })
		} else {
			const busyTime = patients.map(patient => patient.time)
			const result = timeAvailable.filter(time => !busyTime.includes(time))
			res.status(200).json({ freeHours: result })
		}
	}
}

module.exports = {
	createPatient,
	getPatient,
	getPatients,
	updatePatient,
	deletePatient,
	checkDate,
	findPatientByName,
	deleteOldPatients
}
