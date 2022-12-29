const Patient = require('../models/patient')
require('dotenv').config()
const sendEmail = require('../emails/email')
const nodeCache = require('node-cache')
const { Error } = require('mongoose')
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
//Functions to minimize the code
const getArrayToDisableSpecialDate = async (arr, appointment) => {
	const arrToInsert = arr.map((time) => {
		return {
			name: 'Занято врачом',
			phone: 'Занято врачом',
			appointment,
			time
		}
	})
	return await Patient.insertMany(arrToInsert)
}

//CRUD FOR PATIENTS
const createPatient = async (req, res) => {
	const {appointment, time} = req.body
	if(await Patient.findOne({appointment, time})) {throw new Error('Already exists')}
	const patient = await Patient.create(req.body)
	if (patient.email) {
		sendEmail(
			patient,
			`<Спасибо, ${patient.name}, что записались ко мне на прием, напоминаю, что вы должны прийти ${patient.appointment} в ${patient.time}\n\n\n`
			+`Это письмо сформировано автоматически и не требует ответа.`
		)
	}
	res.status(201).json({ patient })
}

const getPatients = async (req, res) => {
	let page = req.query.page || 1
	const limit = req.query.limit || 10
	if(page <= 0) {page = 1}
	const skip = (page - 1) * limit
	const patients = await Patient.find({}).limit(limit).skip(skip) || []
	if (!patients.length) {
		return res.status(200).json({ patients: [] })
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
		return res.status(200).json({ patient })
	}
	res.status(200).json({ patient: patientFromCache })
}

const updatePatient = async (req, res) => {
	const { id: patient_id } = req.params
	const { appointment, time } = req.body
	const patientExists = await Patient.findOne({ appointment, time })
	if (patientExists) {
		throw new Error('Already exists')
	}
	if (!timeAvailable.includes(time)) {
		throw new Error('Unavailable time')
	}
	const patient = await Patient.findByIdAndUpdate(patient_id, req.body, {
		new: true,
	})
	if (!patient) {
		throw new Error('Not Found')
	}
	if (patient.email) {
		sendEmail(
			patient,
			`Спасибо, ${patient.name}, что записались ко мне на прием, напоминаю, что ваша запись была перенесена на ${patient.appointment} в ${patient.time}\n\n\n`
			+`Это письмо сформировано автоматически и не требует ответа.`
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

const checkDate = async (req, res) => {
	const { date } = req.query
	if (!date) {
		throw new Error('Date must be provided as a query')
	}
	const patients = await Patient.find({ appointment: date })
	if (!patients.length) {
		return res.status(200).json({ freeHours: timeAvailable })
	}
	if (patients.length === timeAvailable.length) {
		return res.status(200).json({ freeHours: [] })
	}
	const busyTime = patients.map(patient => patient.time)
	const result = timeAvailable.filter(time => !busyTime.includes(time))
	res.status(200).json({ freeHours: result })
}

const deleteOldPatients = async (req, res) => {
	const today = Date.now()
	const patients = await Patient.find()
	if (!patients.length) {
		return
	}
	const patientsToDelete = patients.filter(patient => {
		const patientDate = patient.appointment.split('-')
		if (
			new Date(
				`${patientDate[1]}/${patientDate[0]}/${patientDate[2]} ${patient.time}:00`
			).getTime() < today
		) {
			return patient._id
		}
	})
	if (!patientsToDelete.length) {
		return res.status(200).json('OK')
	}
	await Patient.deleteMany({ _id: { $in: patientsToDelete } })
	res.status(200).json('OK')
}

const fullFillTheDate = async (req, res) => {
	const {date} = req.body
	if(!date.match(/[0-3][0-9]-[0-1][0-9]-[0-2]0[2-9][0-9]/gm)) {
		throw new Error('Date must be provided')
	}
	const patientsWithThisDate = await Patient.find({appointment: date})
	if(!patientsWithThisDate.length) {
		await getArrayToDisableSpecialDate(timeAvailable, date)
		return res.status(200).send('OK')
	}
	if(patientsWithThisDate.length === timeAvailable.length) {
		return res.status(200).send('OK')
	}
	const busyHours = patientsWithThisDate.map(patient => patient.time)
	const freeHours = timeAvailable.filter((hour) => !busyHours.includes(hour))
	await getArrayToDisableSpecialDate(freeHours, date)
	res.status(200).send('OK')
}

module.exports = {
	createPatient,
	getPatient,
	getPatients,
	updatePatient,
	deletePatient,
	checkDate,
	findPatientByName,
	deleteOldPatients,
	fullFillTheDate,
	timeAvailable
}
