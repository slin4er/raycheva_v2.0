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
const {Bot, Keyboard, InlineKeyboard} = require('grammy')
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
    await ctx.reply('Укажите телефон')
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
        const regexDate = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gi
        const regexPhone = /^\+?[1-9][0-9]{7,14}$/
        if(ctx.message.text.match(regexPhone)) {
            phone = ctx.message.text
            const inlineKeyboard = new InlineKeyboard().text("Регистрация", "registration-payload").text('Найти запись', 'find-payload')
            await ctx.reply('Найти запись или зарегестрироваться?', {reply_markup: inlineKeyboard})
        }else if(ctx.message.text.match(regexDate)) {
            if(ctx.message.text.split('/').length === 3) {
                date = ctx.message.text.split('/').join('-')
            }
            if(ctx.message.text.split('.').length === 3) {
                date = ctx.message.text.split('.').join('-')
            }
            if(ctx.message.text.split('-').length === 3) {
                date = ctx.message.text
            }
            const patientsWithThisDate = await Patient.find({appointment: date})
            if (!patientsWithThisDate.length) {
                const keyboard = createButtons(timeAvailable)
                await ctx.reply('Выберите время', {reply_markup: keyboard})
            }else if (patientsWithThisDate.length === timeAvailable.length) {
                await ctx.reply('Свободного времени нет')
            }else {
                const busyTime = patientsWithThisDate.map(patient => patient.time)
                const result = timeAvailable.filter(time => !busyTime.includes(time))
                const keyboard = createButtons(result)
                await ctx.reply('Выберите время' , {reply_markup: keyboard})
            }
        } else {
            name = ctx.message.text
            await ctx.reply('Укажите дату. Формат: 20-01-2023 или 02/12/2022 или 13.01.2023.')
        }
    }
})

bot.callbackQuery("registration-payload", async (ctx) => {
    await ctx.reply("Укажите имя");
});

bot.callbackQuery('find-payload', async (ctx) => {
    const patient = await Patient.findOne({phone})
    let patientExists = false
    if(patient) {patientExists = true}
    if(patientExists) {
        await ctx.reply(`Здравствуйте, ${patient.name}, ваша запись оформлена на ${patient.appointment} в ${patient.time}. Хорошего вам дня!`)
    } else {
        await ctx.reply('Такого пациента не существует, проверьте указанный номер телефона')
    }
})

bot.start()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))