const Patient = require('../models/patient')
require('dotenv').config()
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
const {Bot, Keyboard} = require('grammy')
let name, email, phone, date = undefined

//Create Buttons Function
const createButtons = (buttonsArray) => {
    if(buttonsArray.length === 1) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).oneTime()
    }
    if(buttonsArray.length === 2) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).oneTime()
    }
    if(buttonsArray.length === 3) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).oneTime()
    }
    if(buttonsArray.length === 4) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row().oneTime()
    }
    if(buttonsArray.length === 5) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row()
            .text(`${buttonsArray[4]}`).oneTime()
    }
    if(buttonsArray.length === 6) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row()
            .text(`${buttonsArray[4]}`).text(`${buttonsArray[5]}`).oneTime()
    }
    if(buttonsArray.length === 7) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row()
            .text(`${buttonsArray[4]}`).text(`${buttonsArray[5]}`).text(`${buttonsArray[6]}`).oneTime()
    }
    if(buttonsArray.length === 8) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row()
            .text(`${buttonsArray[4]}`).text(`${buttonsArray[5]}`).text(`${buttonsArray[6]}`).text(`${buttonsArray[7]}`).row().oneTime()
    }
    if(buttonsArray.length === 9) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row()
            .text(`${buttonsArray[4]}`).text(`${buttonsArray[5]}`).text(`${buttonsArray[6]}`).text(`${buttonsArray[7]}`).row()
            .text(`${buttonsArray[8]}`).oneTime()
    }
    if(buttonsArray.length === 10) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row()
            .text(`${buttonsArray[4]}`).text(`${buttonsArray[5]}`).text(`${buttonsArray[6]}`).text(`${buttonsArray[7]}`).row()
            .text(`${buttonsArray[8]}`).text(`${buttonsArray[9]}`).oneTime()
    }
    if(buttonsArray.length === 11) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row()
            .text(`${buttonsArray[4]}`).text(`${buttonsArray[5]}`).text(`${buttonsArray[6]}`).text(`${buttonsArray[7]}`).row()
            .text(`${buttonsArray[8]}`).text(`${buttonsArray[9]}`).text(`${buttonsArray[10]}`).oneTime()
    }
    if(buttonsArray.length === 12) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row()
            .text(`${buttonsArray[4]}`).text(`${buttonsArray[5]}`).text(`${buttonsArray[6]}`).text(`${buttonsArray[7]}`).row()
            .text(`${buttonsArray[8]}`).text(`${buttonsArray[9]}`).text(`${buttonsArray[10]}`).text(`${buttonsArray[11]}`).row().oneTime()
    }
    if(buttonsArray.length === 13) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row()
            .text(`${buttonsArray[4]}`).text(`${buttonsArray[5]}`).text(`${buttonsArray[6]}`).text(`${buttonsArray[7]}`).row()
            .text(`${buttonsArray[8]}`).text(`${buttonsArray[9]}`).text(`${buttonsArray[10]}`).text(`${buttonsArray[11]}`).row()
            .text(`${buttonsArray[12]}`).oneTime()
    }
    if(buttonsArray.length === 14) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row()
            .text(`${buttonsArray[4]}`).text(`${buttonsArray[5]}`).text(`${buttonsArray[6]}`).text(`${buttonsArray[7]}`).row()
            .text(`${buttonsArray[8]}`).text(`${buttonsArray[9]}`).text(`${buttonsArray[10]}`).text(`${buttonsArray[11]}`).row()
            .text(`${buttonsArray[12]}`).text(`${buttonsArray[13]}`).oneTime()
    }
    if(buttonsArray.length === 15) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row()
            .text(`${buttonsArray[4]}`).text(`${buttonsArray[5]}`).text(`${buttonsArray[6]}`).text(`${buttonsArray[7]}`).row()
            .text(`${buttonsArray[8]}`).text(`${buttonsArray[9]}`).text(`${buttonsArray[10]}`).text(`${buttonsArray[11]}`).row()
            .text(`${buttonsArray[12]}`).text(`${buttonsArray[13]}`).text(`${buttonsArray[14]}`).oneTime()
    }
    if(buttonsArray.length === 16) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row()
            .text(`${buttonsArray[4]}`).text(`${buttonsArray[5]}`).text(`${buttonsArray[6]}`).text(`${buttonsArray[7]}`).row()
            .text(`${buttonsArray[8]}`).text(`${buttonsArray[9]}`).text(`${buttonsArray[10]}`).text(`${buttonsArray[11]}`).row()
            .text(`${buttonsArray[12]}`).text(`${buttonsArray[13]}`).text(`${buttonsArray[14]}`).text(`${buttonsArray[15]}`).row().oneTime()
    }
    if(buttonsArray.length === 17) {
        return new Keyboard()
            .text(`${buttonsArray[0]}`).text(`${buttonsArray[1]}`).text(`${buttonsArray[2]}`).text(`${buttonsArray[3]}`).row()
            .text(`${buttonsArray[4]}`).text(`${buttonsArray[5]}`).text(`${buttonsArray[6]}`).text(`${buttonsArray[7]}`).row()
            .text(`${buttonsArray[8]}`).text(`${buttonsArray[9]}`).text(`${buttonsArray[10]}`).text(`${buttonsArray[11]}`).row()
            .text(`${buttonsArray[12]}`).text(`${buttonsArray[13]}`).text(`${buttonsArray[14]}`).text(`${buttonsArray[15]}`).row()
            .text(`${buttonsArray[16]}`).oneTime()
    }
}

const bot = new Bot(process.env.BOT_TOKEN)
bot.command('start', async context => {
    await context.reply('Здравствуйте, используйте меню команд слева внизу')
})

bot.command('find', async ctx => {
    await ctx.reply('Здравствуйте, для того, чтобы узнать на когда оформлена ваша запись просто напишите номер вашего телефона, указанный при регистрации')
})

bot.command('create', async ctx => {
    await ctx.reply('Укажите имя')
})

bot.on('message', async (ctx) => {
    if(ctx.message.text.split(':').length === 2) {
        const patient = await Patient.create({
            name,
            email,
            phone,
            appointment: date,
            time: ctx.message.text
        })
        await ctx.reply(`${patient.name}, Спасибо за регистрацию на ${patient.appointment} в ${patient.time}`)
    } else {
        const regexDate = /[0-9]{2}-[0-9]{2}-[0-9]{4}/
        const regexPhone = /^\+?[1-9][0-9]{7,14}$/
        const appointment = ctx.message.text.match(regexDate)
        // if(ctx.message.text.split(',').length !== 4) {
        //     await ctx.reply('Неправильно указаны данные, пример:/n' +
        //         'Иван Иванов, ivan@gmail.com, +37377722333, 20-01-2023')
        // } else {
        //     if(!appointment) {
        //         await ctx.reply('Неправильно указана дата')
        //     } else {
        //         name = ctx.message.text.split(',')[0].trim()
        //         email = ctx.message.text.split(',')[1].trim()
        //         phone = ctx.message.text.split(',')[2].trim()
        //         const patientsWithThisDate = await Patient.find({appointment: appointment[0]})
        //         if (!patientsWithThisDate.length) {
        //             date = appointment[0]
        //             const keyboard = createButtons(timeAvailable)
        //             await ctx.reply('Выберите время', {reply_markup: keyboard})
        //         }else if (patientsWithThisDate.length === timeAvailable.length) {
        //             await ctx.reply('Свободного времени нет')
        //         }else {
        //             date = appointment[0]
        //             const busyTime = patientsWithThisDate.map(patient => patient.time)
        //             const result = timeAvailable.filter(time => !busyTime.includes(time))
        //             const keyboard = createButtons(result)
        //             await ctx.reply('Выберите время' , {reply_markup: keyboard})
        //         }
        //     }
        // }
        if(ctx.message.text.match(regexPhone)) {
            phone = ctx.message.text
            const patient = await Patient.findOne({phone: ctx.message.text})
            let patientExists = false
            if(patient) {patientExists = true}
            if(patientExists) {
                await ctx.reply(`Здравствуйте, ${patient.name}, ваша запись оформлена на ${patient.appointment} в ${patient.time}. Хорошего вам дня!`)
            } else {
                phone = ctx.message.text
                await ctx.reply('Укажите дату, формат даты: 20-01-2022')
            }
        }else if(ctx.message.text.match(regexDate)) {
            date = ctx.message.date
            const patientsWithThisDate = await Patient.find({appointment: date})
            if (!patientsWithThisDate.length) {
                date = appointment[0]
                const keyboard = createButtons(timeAvailable)
                await ctx.reply('Выберите время', {reply_markup: keyboard})
            }else if (patientsWithThisDate.length === timeAvailable.length) {
                await ctx.reply('Свободного времени нет')
            }else {
                date = appointment[0]
                const busyTime = patientsWithThisDate.map(patient => patient.time)
                const result = timeAvailable.filter(time => !busyTime.includes(time))
                const keyboard = createButtons(result)
                await ctx.reply('Выберите время' , {reply_markup: keyboard})
            }
        } else {
            name = ctx.message.text
            await ctx.reply('Укажите телефон')
        }
    }
})

bot.start()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))