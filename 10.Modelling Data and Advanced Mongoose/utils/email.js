const nodemailer = require('nodemailer')

const sendEmail = async options => {

    //1. Create Transporter Service that will actually send the email Ex Gmail
    //We don't Use Gmail bec it isn't good for production the mails are marked as spam and we have only limit if 500 mail per day
    // const transporter =nodemailer.createTransport({
    //     service:'Gmail',
    //     auth:{
    //         user:process.env.EMAIL_USERNAME,
    //         pass:process.env.EMAIL_PASSWORD
    //     }
    // })

    //Use mailtrap for development to send fake mails
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    //2. Define the email Options
    const mailOptions = {
        from: 'Basma Elhoseny <basma@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    //3.Send the mail
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;