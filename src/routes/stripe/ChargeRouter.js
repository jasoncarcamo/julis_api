const express = require('express');
const ChargeRouter = express.Router();
const stripe = require("stripe")("sk_test_XQPTIkYjBBK2KaIMCesshmPy00SrwHWkFu");

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
        }

        return res.status(201).json({status});
    });

module.exports = ChargeRouter;

