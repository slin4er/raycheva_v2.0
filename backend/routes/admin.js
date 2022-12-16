const express = require('express')
const {loginAdmin, logoutAdmin} = require("../controllers/admin");
const router = express.Router()
const auth = require('../middlewares/auth')

router.route('/login').post(loginAdmin)
router.route('/logout').post(auth, logoutAdmin)

module.exports = router