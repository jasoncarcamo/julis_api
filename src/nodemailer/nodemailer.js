require("dotenv").config();

const nodemailer = require("nodemailer");
const {NODE_MAILER_PASS} = require("../../config");

const transporter = nodemailer.createTransport({
    service: 'Yahoo',
    port: 587,
    auth: {
        user: "jasoncarcamo30@yahoo.com",
        pass: NODE_MAILER_PASS
    }
});

module.exports = transporter;
