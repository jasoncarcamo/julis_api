const express = require("express");
const RequesRouter = express.Router();
const RequestsService = require("./RequestsService");
const {requireAuth} = require("../../middleware/JwtAuth");
const transporter = require("../../nodemailer/nodemailer"); 
const xss = require("xss");



RequesRouter
    .route("/requests")
    .all(express.json())
    .all(requireAuth)
    .get(( req, res) => {
        RequestsService.getAllRequests(req.app.get("db"))
            .then( data => {

                if(req.user.id == 1){
                    
                    RequestsService.adminGetRequests(req.app.get("db"))
                        .then( adminRequests => {

                            return res.status(200).json({adminRequests});
                        });

                } else{
                    return res.status(200).json({ requests: data});
                };                
            });
    })
    .post((req, res, next)=>{
        
        RequestsService.createRequest( req.app.get("db"), req.body)
            .then( data => res.status(200).json({ id: data}))
            .catch(next);
    })
    .patch((req, res, next)=>{
        
        const update = {
            service: req.body.service,
            price: req.body.price,
            time: req.body.time,
            date: req.body.date,
            confirmed: req.body.confirmed === true ? req.body.confirmed : false
        };

        if(!req.body.id){
            return res.status(400).json({ error: "Bad request"})
        };



        RequestsService.updateRequest( req.app.get("db"), update, req.body.id)
            .then( data => {

                if(update.confirmed){
                    const mailOptions = {
                        from: "jasoncarcamo30@yahoo.com",
                        to: req.user.email,
                        subject: "Your services have been processed",
                        html: `<main style="text-align: center;"><p>Your services have been processed<p></main>`
                    };

                    transporter.sendMail( mailOptions, ( error, info)=>{
                        if(error){
                            return res.status(400).json({ error });
                        };

                        return res.status(200).json({ request: "Sent"});
                        
                    });
                } else{
                    return res.status(200).json({ request: "Sent"});
                };
                
            })
            .catch(next);
    });

RequesRouter
    .route("/requests/:id")
    .all(requireAuth)
    .all(express.json())
    .get((req, res, next)=>{
        
        RequestsService.getRequestById(req.app.get("db"), req.params.id)
            .then( data => {
                
                if(!data){
                    return res.status(400).json({ error: "No requests found by client"})
                };

                return res.status(200).json({ requests: data})
            })
            .catch(next);
    })
    .delete((req, res)=> {
        if(!req.params.id){
            return res.status(400).json({ error: "Missing id in params"})
        };

        RequestsService.deleteRequest( req.app.get("db"), req.params.id)
            .then( data => {
                if(!data){
                    return res.status(400).json({ error: "No request found"})
                };

                return res.status(200).json({ success: "Deleted"})
            });
    })


module.exports = RequesRouter;