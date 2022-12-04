const express = require('express')
const {createPatient, getPatients, getPatient, updatePatient, deletePatient} = require("../controllers/patient");
const router = express.Router()

router.route('/').get(getPatients).post(createPatient)
router.route('/:id').get(getPatient).patch(updatePatient).delete(deletePatient)

module.exports = router