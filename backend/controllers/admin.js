const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')

const loginAdmin = async (req, res) => {
	const getToken = async admin => {
		const token = jwt.sign({ id: admin._id }, process.env.TOKEN_KEY, {
			expiresIn: '24h',
		})
		admin.token = token
		await admin.save()
		return token
	}
	const { login, password } = req.body
	if (login !== process.env.LOGIN || password !== process.env.PASSWORD) {
		throw new Error('You are not suppose to be here!')
	}

	let admin = await Admin.findOne({ login })
	if (!admin) {
		const hashedPassword = await bcrypt.hash(password, 10)
		admin = await Admin.create({ ...req.body, password: hashedPassword })
		const token = await getToken(admin)
		res.status(200).json({ token })
	} else {
		if (!(await bcrypt.compare(password, admin.password))) {
			throw new Error('Wrong password or login')
		}
		const token = await getToken(admin)
		res.status(200).json({ token })
	}
}

const logoutAdmin = async (req, res) => {
	if (!req.admin) {
		throw new Error('You are not suppose to be here!')
	}
	req.admin.token = undefined
	await req.admin.save()
	res.status(200).json({ message: 'you have logged out successfully' })
}

module.exports = {
	loginAdmin,
	logoutAdmin,
}
