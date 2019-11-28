const express = require("express");
const RequesRouter = express.Router();
const RequestsService = require("./RequestsService");

RequesRouter
    .route("/requests")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get(( req, res) => {
        RequestsService.getAllRequests(req.app.get("db"))
            .then( data => res.status(200).json({ requests: data}));
    })
    .post((req, res)=>{
        
        RequestsService.createRequest( req.app.get("db"), req.body)
            .then( data => res.status(201).json({ id: data}));
    })
    .patch((req, res)=>{
        
        const update = {
            service: req.body.service,
            price: req.body.price,
            confirmed: req.body.confirmed === true ? req.body.confirmed : false
        };

        if(!req.body.id){
            return res.status(400).json({ error: "Bad request"})
        }

        RequestsService.updateRequest( req.app.get("db"), update, req.body.id)
            .then( data => res.status(200).json({ request: "Sent"}));
    })

module.exports = RequesRouter;