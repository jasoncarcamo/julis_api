const express = require("express");
const ContactRouter  = express.Router();
const {requireAuth} = require("../../middleware/JwtAuth");
const transporter = require("../../nodemailer/nodemailer");
const xss = require("xss");

ContactRouter
    .route("/contact")
    .all(express.json())
    .get((req, res)=> {

    })
    .post((req, res)=> {
        
        const {
            first_name,
            last_name,
            email,
            comments
        } = req.body;

        const userComment = {
            first_name,
            last_name,
            email,
            comments
        };

        for(const [key, value] of Object.entries(userComment)){
            if(value === undefined){
                return res.status(400).json({ error: `Missing ${key} in body request`});
            };

        };

        const mailOptions = {
            from: "jasoncarcamo30@yahoo.com",
            to: userComment.email,
            subject: "Thank you for contacting us",
            html: `<main style="text-align: center;"><p>Thank you for contacting us. You will be hearing from us soon.<p></main>`
        };

        return res.status(200).json({success: "Thank you for contacting us!"})

    })

ContactRouter
    .route("/contact/:id")
    .all(requireAuth)
    .all(express.json())
    .get((req, res, next)=>{

    })
    .post((req, res)=> {
        const { comments } = req.body;
        const newComment = {comments};

        if(!newComment.comments){
            return res.status(400).json({ error: "Missing comment in body request"});
        };

        const mailOptions = {
            from: "jasoncarcamo30@yahoo.com",
            to: req.user.email,
            subject: "Thank you for contacting us",
            html: `<main style="text-align: center;"><p>Thank you for contacting us. You will be hearing from us soon.<p></main>`
        };

        transporter.sendMail( mailOptions, ( error, info)=>{
            if(error){
                
                return res.status(400).json({ error })
            };

        });

        return res.status(200).json({ success: "Your comment had been sent."})
    })

module.exports = ContactRouter;