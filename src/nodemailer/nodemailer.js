require("dotenv").config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'Yahoo',
    port: 587,
    auth: {
        user: "jasoncarcamo30@yahoo.com",
        pass: "igld kywe pcub eerf"
    }
});

module.exports = transporter;
