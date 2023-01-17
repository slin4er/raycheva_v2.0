const Patient = require('../models/patient')
require('dotenv').config()
const {Telegraf} = require('telegraf')
const {Keyboard} = require('telegram-keyboard')
const {
    createButtons,
    findPatient,
    createPatient,
    getArrayOfHours,
    getCalendar
} = require('./telegramBotFunctions')

const regexPhone = /^\+?[1-9][0-9]{7,14}$/
const regexTime = /[0-1][0-9]:[0,3]0/gm
let phone, date, time, name, freeHours, makeAnAppointment = undefined

const bot = new Telegraf(process.env.BOT_TOKEN)
const calendar = getCalendar(bot)

calendar.setDateListener(async (ctx, dateReceived) => {
    const niceFormatDate = dateReceived.split('-')
    await ctx.reply(`${niceFormatDate[2]}-${niceFormatDate[1]}-${niceFormatDate[0]}`)
    date = `${niceFormatDate[2]}-${niceFormatDate[1]}-${niceFormatDate[0]}`
    freeHours = await getArrayOfHours(`${niceFormatDate[2]}-${niceFormatDate[1]}-${niceFormatDate[0]}`)
    if(!freeHours) {
        return ctx.reply('На эту дату все занято, выберите другую', calendar.getCalendar())
    }
    const keyboard = createButtons(freeHours)
    await ctx.reply('Выберите время', keyboard)
});

bot.start(async (ctx) => {
    name = `${ctx.message.from.first_name} ${ctx.message.from.last_name}`
    await ctx.reply('Здравствуйте, вы хотите записаться или найти свою запись?', Keyboard.make([
        ['Записаться','Найти запись']
    ]).oneTime().reply())
})


bot.hears('Найти запись', async (ctx) => {
    await ctx.reply('Для этого нам понадобиться ваш телефон, указанный при регистрации', Keyboard.make([
        [{
            text: "Показать телефон",
            request_contact: true,
        },'Указать вручную']
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
        // const patient = await Patient.findOne({phone})
        // if(patient) {
        //     makeAnAppointment = false
        //     return await ctx.reply(`${patient.name}, у вас уже есть запись на ${patient.appointment} в ${patient.time}. Сначала посетите эту запись`)
        // }
        await ctx.reply("Выберите дату", calendar.getCalendar())
        makeAnAppointment = false
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
    if(!name) {
        name = `${ctx.message.from.first_name} ${ctx.message.from.last_name}`
    }
    time = ctx.message.text
    const patient = await createPatient(name, phone, date, time)
    return ctx.reply(`${patient.name}, спасибо, что записались ко мне на прием на ${patient.appointment} в ${patient.time}`)
})

bot.on('message', async (ctx) => {
    return await ctx.reply('Неверный формат телефона! Пример верного формата: +37377722333, 77722333')
})

bot.launch().catch((err) => {
    console.log('Упс.' + err.message)
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

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