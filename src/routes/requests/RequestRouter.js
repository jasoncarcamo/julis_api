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
        console.log(req.body)
        RequestsService.createRequest( req.app.get("db"), req.body)
            .then( data => res.status(201).json({ requests: "Created"}))
    })
    .patch((req, res)=>{
        console.log(req.body.service, req.body.id);
        RequestsService.updateRequest( req.app.get("db"), req.body.service, req.body.id)
            .then( data => res.status(204).json({ request: "Sent"}));
    })

module.exports = RequesRouter;