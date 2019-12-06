require("dotenv").config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: "jasoncarcamo30@yahoo.com",
        pass: "Gearsofwar33!"
    }
});

module.exports = transporter;
