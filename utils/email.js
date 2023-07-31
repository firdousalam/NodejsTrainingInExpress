// service sending email
var nodemailer = require('nodemailer');
require('dotenv').config();

const email = {
    sendAdminOTP : function(toEmail,OTP){
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.email,
            pass: process.env.password
            }
        });
        
        var mailOptions = {
            from: process.env.email,
            to: toEmail,
            subject: 'OTP from abc corp',
            text: 'Dear Admin, Please find your OTP : '+OTP
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    },
    sendUserOTP : function(toEmail,OTP){
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.email,
            pass: process.env.password
            }
        });
        
        var mailOptions = {
            from: process.env.email,
            to: toEmail,
            subject: 'OTP from abc corp',
            text: 'Dear User, Please find your OTP : '+OTP
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }
}
module.exports = email;