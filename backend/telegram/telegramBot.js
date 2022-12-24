const Patient = require('../models/patient')
require('dotenv').config()
const {Bot, Keyboard, GrammyError, HttpError} = require('grammy')

const regexPhone = /^\+?[1-9][0-9]{7,14}$/
const bot = new Bot(process.env.BOT_TOKEN)

const findPatient = async (phone) => {
    const patient = await Patient.findOne({phone})
    if(!patient) {return 'Такого пациента к сожалению нет'}
    return `Ваша запись оформлена на ${patient.appointment} в ${patient.time}`
}

bot.command('start', async (ctx) => {
    const keyboard = new Keyboard().requestContact('Показать телефон боту').resized(true).text('Указать вручную').oneTime()
    await ctx.reply(`Здравствуйте,${ctx.message.from.first_name} ,для поиска записи необходим ваш номер телефона`, {reply_markup: keyboard})
})

bot.on("message",async (ctx)=>{
    if(ctx.message.text === 'Указать вручную') {
        return await ctx.reply('Укажите телефон вручную')
    }
    if(regexPhone.test(ctx.message.text)) {
        const reply = await findPatient(ctx.message.text)
        return await ctx.reply(reply)
    }
    if(!ctx.update.message.contact) {
        return ctx.reply('Вы что то неверно указали, попробуйте снова или просто резрешите боту показать ваш номер')
    }
    const reply = await findPatient(ctx.update.message.contact.phone_number)
    return await ctx.reply(reply)
})

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});


bot.start()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))