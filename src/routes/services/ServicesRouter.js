const express = require("express");
const ServiceRouter = express.Router();
const Services = require("./Services");

ServiceRouter
    .route("/services")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res) => {
        Services.getAllServices( req.app.get("db"))
            .then( data => res.status(200).json({ services: data}));
    })

module.exports = ServiceRouter;