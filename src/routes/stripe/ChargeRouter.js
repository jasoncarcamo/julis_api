const express = require('express');
const ChargeRouter = express.Router();
const stripe = require("stripe")("sk_test_XQPTIkYjBBK2KaIMCesshmPy00SrwHWkFu");
const transporter = require("../../nodemailer/nodemailer");

ChargeRouter
    .route("/charge")
    .all(express.json())
    .post(async (req, res)=>{

        let {status} = await stripe.charges.create({
            amount: 2000,
            currency: "usd",
            description: "An example description",
            source: req.body.token
        });

        if(!status){
            return res.status(500).send();
        };

        const mailOptions = {
            from: "jasoncarcamo30@yahoo.com",
            to: "jasoncarcamo30@gmail.com",
            subject: "Your services have been processed",
            html: "<html> <header> <h3>Julis Cleaning service</h3></header> <main> <p>Your services have been processed<p></main></html>"
        };

        /*transporter.sendMail( mailOptions, ( error, info)=>{
            if(error){
                console.log(error);
            };

            if(info.response){
                console.log(info.response);
            };
        });*/

        return res.status(200).json({status});
    });

module.exports = ChargeRouter;

