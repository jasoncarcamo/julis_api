require("dotenv").config();
console.log(require("dotenv").config({ path:__dirname+'/./../../.env'}));
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'Yahoo',
    port: 587,
    auth: {
        user: "jasoncarcamo30@yahoo.com",
        pass: process.env.NODE_MAILER_PASS
    }
});

module.exports = transporter;
