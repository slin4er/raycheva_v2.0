const Patient = require('../models/patient')
require('dotenv').config()
const sendEmail = require('../emails/email')

//CRUD FOR PATIENTS
const createPatient = async (req, res) => {
	const patient = await Patient.create(req.body)
	if (patient.email) {
		sendEmail(
			patient,
			`Спасибо, ${patient.name}, что записались ко мне на прием, напоминаю, что вы должны прийти ${patient.appointment} в здесь будет время`
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

const updatePatient = async (req, res) => {
	const { id: patient_id } = req.params
	const patient = await Patient.findByIdAndUpdate(patient_id, req.body, {
		new: true,
	})
	if (!patient) {
		throw new Error('Not Found')
	}
	if (patient.email) {
		sendEmail(
			patient,
			`Спасибо, ${patient.name}, что записались ко мне на прием, напоминаю, что ваша запись была перенесена на ${patient.appointment} в здесь будет время`
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

//DATES

// date.toLocaleString()
const checkDate = async (req, res) => {
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
	const { date } = req.query
	if (!date) {
		throw new Error('Date must be provided as a query')
	}
	const patients = await Patient.find({ appointment: date })
	if (!patients.length) {
		res.status(200).send(timeAvailable)
	} else {
		if (patients.length === timeAvailable.length) {
			res.status(200).json('Full')
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
}
