const express = require("express");
const ResetPassword = express.Router();
const {requireAuth} = require("../../middleware/JwtAuth");
const resetService = require("./ResetService");
const UserService = require("../users/UsersService");
const RegisterRouter = require("../registration/RegisterService");
const AuthService = require("../login/AuthService");
const transporter = require("../../nodemailer/nodemailer");
const xss = require("xss");

ResetPassword
    .route("/reset")
    .all(requireAuth)
    .all(express.json())
    .post((req, res, next)=> {
        const {
            newPassword,
            confirmPassword
        } = req.body;

        const password = {
            newPassword,
            confirmPassword
        };

        for( const [key, value] of Object.entries(password)){
            if( value === undefined){
                return res.status(400).json({ error: `Missing ${key} in body request`});
            };
        };

        UserService.getUser( req.app.get("db"), req.user.id)
            .then( user => {
                if(!user){
                    return res.status(400).json({error: "No user found"});
                };
                
                AuthService.comparePassword(password.newPassword, user[0].password)
                    .then( currentPassword => {
                        
                        if(currentPassword){
                            
                            return res.status(400).json({ error: "Can not change password to current password"});
                        };

                        RegisterRouter.hashPassword( password.newPassword)
                            .then( hashedPassword => {
                                password.confirmPassword = hashedPassword;

                                resetService.updatePassword( req.app.get("db"), password.confirmPassword, req.user.id)
                                    .then( passwordChanged => {

                                        const mailOptions = {
                                            from: "jasoncarcamo30@yahoo.com",
                                            to: req.user.email,
                                            subject: "Do Not Reply",
                                            html: `<main style="text-align: center;"><p>You have successfully changed your password. Log in <a href="https://julis-cleaning-company.jasoncarcamo30.now.sh/login"> here</a><p></main>`
                                        };
        
                                        transporter.sendMail( mailOptions, ( error, info)=>{
                                            if(error){
                                                console.log(error, req.user.email)
                                                return res.status(400).json({ error: "Email failed" });
                                            };

                                            return res.status(200).json({ success: "Your password has been changed"});
                                        });

                                        
                                    })
                                    .catch(next)
                            })
                            .catch(next)
                    })
                    .catch(next)
            })
            .catch(next)

    })

module.exports = ResetPassword;