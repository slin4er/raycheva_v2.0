const express = require('express')
const {createPatient, getPatients, getPatient, updatePatient, deletePatient} = require("../controllers/patient");
const router = express.Router()
const auth = require('../middlewares/auth')

router.route('/').get(auth, getPatients).post(createPatient)
router.route('/:id').get(auth, getPatient).patch(auth, updatePatient).delete(auth, deletePatient)

module.exports = router