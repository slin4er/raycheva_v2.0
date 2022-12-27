const request = require('supertest')
const app = require('../app')
const connectDB = require('../db/connect')
require('dotenv').config()
const Patient = require('../models/patient')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

beforeAll(async () => {
    await connectDB(process.env.TEST_MONGODB_URI)
    await Patient.deleteMany()
    await Admin.deleteMany()
    await Admin.create(admin)
    await Patient.create(user)
})

afterAll(async () => {
    await Patient.deleteMany()
})

const id = new mongoose.Types.ObjectId()
const admin_id = new mongoose.Types.ObjectId()

const user = {
    _id: id,
    name: 'Andrew',
    phone: '34613120591',
    appointment: '12-12-2022',
    time: '9:30',
}

const admin = {
    _id: admin_id,
    login: process.env.LOGIN,
    password: process.env.PASSWORD,
    token: jwt.sign({id: admin_id}, process.env.TOKEN_KEY)
}

// test('Should create a patient', async () => {
//     await request(app).post('/api/v1').send(user).expect(201)
// })
//
// test('Should fail: Existing number', async () => {
//     await request(app).post('/api/v1').send(user).expect(500)
// })
//
// test('Should create admin', async () => {
//     await request(app).post('/api/v1/admin/login')
//         .send(admin)
//         .expect(201)
// })
//
// test('should logout admin', async () => {
//     request(app).get('/api/v1/admin/logout')
//         .set('Authorization', `Bearer ${admin.token}`)
//         .send()
//         .expect(200)
// })
//     //.set('Authorization', `Bearer ${user.token}`)
//
// test('Should login admin', async () => {
//     await request(app).post('/api/v1/admin/login')
//         .send(admin)
//         .expect(200)
// })

test('Should find patient by ID', async () => {
    await request(app).get(`/api/v1/${user._id}`)
        .set('Authorization', `Bearer ${admin.token}`)
        .send()
        .expect(200)
})