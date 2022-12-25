const Patient = require('../models/patient')
require('dotenv').config()
const {Telegraf} = require('telegraf')
const Calendar = require("telegraf-calendar-telegram");
const {Keyboard} = require('telegram-keyboard')

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
const regexPhone = /^\+?[1-9][0-9]{7,14}$/
const regexTime = /[0-1][0-9]:[0,3]0/gm
let phone, date, time, name, freeHours, makeAnAppointment = undefined
const bot = new Telegraf(process.env.BOT_TOKEN)
const calendar = new Calendar(bot, {
    startWeekDay: 1,
    weekDayNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    monthNames: [
        "Янв", "Фев", "Март", "Апр", "Май", "Июнь",
        "Июль", "Авг", "Сен", "Окт", "Нояб", "Дек"
    ],
    ignoreWeekDays: [5,6]
})
calendar.setMinDate(new Date())

const createButtons = (buttonsArray) => {
    if(buttonsArray.length === 1) {
        return Keyboard.make([
            [buttonsArray[0]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 2) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 3) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 4) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 5) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]],
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 6) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 7) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 8) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 9) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 10) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 11) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 12) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]], [buttonsArray[11]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 13) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]], [buttonsArray[11]],
            [buttonsArray[12]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 14) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]], [buttonsArray[11]],
            [buttonsArray[12]], [buttonsArray[13]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 15) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]], [buttonsArray[11]],
            [buttonsArray[12]], [buttonsArray[13]], [buttonsArray[14]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 16) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]], [buttonsArray[11]],
            [buttonsArray[12]], [buttonsArray[13]], [buttonsArray[14]], [buttonsArray[15]]
        ]).oneTime().reply()
    }
    if(buttonsArray.length === 17) {
        return Keyboard.make([
            [buttonsArray[0]], [buttonsArray[1]], [buttonsArray[2]], [buttonsArray[3]],
            [buttonsArray[4]], [buttonsArray[5]], [buttonsArray[6]], [buttonsArray[7]],
            [buttonsArray[8]], [buttonsArray[9]], [buttonsArray[10]], [buttonsArray[11]],
            [buttonsArray[12]], [buttonsArray[13]], [buttonsArray[14]], [buttonsArray[15]],
            [buttonsArray[16]]
        ]).oneTime().reply()
    }
}

const findPatient = async (phone) => {
    const patient = await Patient.findOne({phone})
    if(!patient) {return 'Такого пациента к сожалению нет'}
    return `Ваша запись оформлена на ${patient.appointment} в ${patient.time}`
}

const createPatient = async (name, phone, appointment, time) => {
    return await Patient.create({
        name,
        phone,
        appointment,
        time
    })
}

calendar.setDateListener(async (ctx, dateRecived) => {
    const niceFormatDate = dateRecived.split('-')
    await ctx.reply(`${niceFormatDate[2]}-${niceFormatDate[1]}-${niceFormatDate[0]}`)
    date = `${niceFormatDate[2]}-${niceFormatDate[1]}-${niceFormatDate[0]}`
    freeHours = await getArrayOfHours(`${niceFormatDate[2]}-${niceFormatDate[1]}-${niceFormatDate[0]}`)
    if(!freeHours) {
        return ctx.reply('На эту дату все занято, выберите другую', calendar.getCalendar())
    }
    const keyboard = createButtons(freeHours)
    await ctx.reply('Выберите время', keyboard)
});

const getArrayOfHours = async (date) => {
    const patients = await Patient.find({appointment: date})
    if(patients.length === timeAvailable.length) {
        return false
    }
    if(!patients.length) {
        return timeAvailable
    }
    const busyHours = patients.map(patient => patient.time)
    return timeAvailable.filter(hour => !busyHours.includes(hour))
}

bot.start(async (ctx) => {
    name = `${ctx.message.from.first_name} ${ctx.message.from.last_name}`
    await ctx.reply('Здравствуйте, вы хотите записаться или найти свою запись?', Keyboard.make([
        ['Записаться'], ['Найти запись']
    ]).oneTime().reply())
})


bot.hears('Найти запись', async (ctx) => {
    await ctx.reply('Для этого нам понадобиться ваш телефон, указанный при регистрации', Keyboard.make([
        [{
            text: "Показать телефон",
            request_contact: true,
        }], ['Указать вручную']
    ]).oneTime().reply())
})

bot.hears('Записаться', async (ctx) => {
    makeAnAppointment = true
    await ctx.reply('Для этого нам понадобиться ваш телефон', Keyboard.make([
        [{
            text: "Показать телефон",
            request_contact: true,
        }]
    ]).oneTime().reply())
})

bot.on("contact", async (ctx) => {
    phone = ctx.message.contact.phone_number;
    if(makeAnAppointment) {
        await ctx.reply("Выберите дату", calendar.getCalendar())
    } else {
        await ctx.reply(`${await findPatient(phone)}`)
    }
});

bot.hears(regexPhone, async (ctx) => {
    const reply = await findPatient(ctx.message.text)
    return await ctx.reply(reply)
})

bot.hears('Указать вручную', async (ctx) => {
    await ctx.reply('Укажите телефон вручную')
})

bot.hears(regexTime, async (ctx) => {
    time = ctx.message.text
    const patient = await createPatient(name, phone, date, time)
    return ctx.reply(`${patient.name}, спасибо, что записались ко мне на прием на ${patient.appointment} в ${patient.time}`)
})

bot.on('message', async (ctx) => {
    return await ctx.reply('Неверный формат телефона! Пример верного формата: +37377722333, 77722333')
})

//GRAMMY VERSION

// const keyboard = new Keyboard().requestContact('Показать телефон боту').resized(true).text('Указать вручную').oneTime()
// await ctx.reply(`Здравствуйте,${ctx.message.from.first_name} ,для поиска записи необходим ваш номер телефона`, {reply_markup: keyboard})
//})

// bot.on("message",async (ctx)=>{
//     if(ctx.message.text === 'Указать вручную') {
//         return await ctx.reply('Укажите телефон вручную')
//     }
//     if(regexPhone.test(ctx.message.text)) {
//         const reply = await findPatient(ctx.message.text)
//         return await ctx.reply(reply)
//     }
//     if(!ctx.update.message.contact) {
//         return ctx.reply('Вы что то неверно указали, попробуйте снова или просто резрешите боту показать ваш номер')
//     }
//     const reply = await findPatient(ctx.update.message.contact.phone_number)
//     return await ctx.reply(reply)
// })
//
// bot.catch((err) => {
//     const ctx = err.ctx;
//     console.error(`Error while handling update ${ctx.update.update_id}:`);
//     const e = err.error;
//     if (e instanceof GrammyError) {
//         console.error("Error in request:", e.description);
//     } else if (e instanceof HttpError) {
//         console.error("Could not contact Telegram:", e);
//     } else {
//         console.error("Unknown error:", e);
//     }
// });


bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))