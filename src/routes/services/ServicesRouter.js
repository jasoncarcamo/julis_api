const express = require("express");
const ServiceRouter = express.Router();
const Services = require("./Services");
const {requireAuth} = require("../../middleware/JwtAuth");

ServiceRouter
    .route("/services")
    .all(express.json())
    .get((req, res, next) => {
        Services.getAllServices( req.app.get("db"))
            .then( data => res.status(200).json({ services: data}))
            .catch(next);
    })

module.exports = ServiceRouter;