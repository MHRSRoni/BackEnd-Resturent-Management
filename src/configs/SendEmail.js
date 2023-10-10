const nodemailer = require('nodemailer');

const SendEmail = async (emailData) => {
    try {
        const transpoter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'Kachchi Palace <mdrafat248@gmail.com>',
            to: emailData.to,
            subject: emailData.subject,
            html: emailData.html
        };

        return await transpoter.sendMail(mailOptions);

    } catch (error) {
        console.log(error)
    }
};

module.exports = SendEmail;