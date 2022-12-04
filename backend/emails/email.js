const nodemailer = require("nodemailer");
const sendEmail = (patient, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'evelina.raycheva.ginekolog@gmail.com',
            pass:process.env.GMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: 'evelina.raycheva.ginekolog@gmail.com',
        to: patient.email,
        subject: 'Запись на прием',
        text: message
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {throw new Error(err.message)}
    })
}

module.exports = sendEmail