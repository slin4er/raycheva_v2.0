const Admin = require('../models/admin')
require('dotenv').config()
const bcrypt = require('bcrypt')

const loginAdmin = async (req, res) => {
	const { login, password } = req.body
	if (login !== process.env.LOGIN || password !== process.env.PASSWORD) {
		throw new Error('You are not suppose to be here!')
	}
	let admin = await Admin.findOne({ login })
	if (!admin) {
		const hashedPassword = await bcrypt.hash(password, 10)
		admin = await Admin.create({ ...req.body, password: hashedPassword })
		const token = await admin.generateAuthToken()
		return res.status(201).json({ token })
	}
	if (!(await bcrypt.compare(password, admin.password))) {
		throw new Error('Wrong password or login')
	}
	const token = await admin.generateAuthToken()
	return res.status(200).json({ token })
}

const logoutAdmin = async (req, res) => {
	if (!req.admin) {throw new Error('You are not suppose to be here!')}
	req.admin.token = undefined
	await req.admin.save()
	return res.status(200).json({ message: 'you have logged out successfully' })
}

module.exports = {
	loginAdmin,
	logoutAdmin,
}
