const express = require('express')
const {
    createPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient,
    checkDate,
    findPatientByName,
    deleteOldPatients
} = require("../controllers/patient");
const router = express.Router()
const auth = require('../middlewares/auth')

router.route('/').get(auth, getPatients).post(createPatient)
router.route('/:id').get(auth, getPatient).patch(auth, updatePatient).delete(auth, deletePatient)
router.route('/date/available').get(checkDate)
router.route('/patient/data').get(findPatientByName)
router.route('/delete/patients').post(deleteOldPatients)

module.exports = router