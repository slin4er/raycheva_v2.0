const Patient = require('../models/patient')
require('dotenv').config()

const {Telegraf} = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('Привет', context => {
    bot.telegram.sendMessage(context.message.chat.id, 'Здравствуйте, для того, чтобы узнать на когда оформлена ваша дата просто напишите номер вашего телефона, указанный при регистрации')
})

bot.on('text', async (ctx) => {
    const patient = await Patient.findOne({phone: ctx.message.text})
    let patientExists = true
    if(!patient) {patientExists = false}
    const text = patientExists ?
        `Здравствуйте, ${patient.name}, ваша запись оформлена на ${patient.appointment} в ${patient.time}. Хорошего вам дня!`
        :`Такого пациента нет, нужен телефон, указанный при регистрации, спасибо!`
    await ctx.telegram.sendMessage(ctx.message.chat.id, text)
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))