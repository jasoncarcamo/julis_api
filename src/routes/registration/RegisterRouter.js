const express = require("express");
const RegisterRouter = express.Router();
const RegisterService = require("./RegisterService");
const AuthService = require("../login/AuthService");
const transporter = require("../../nodemailer/nodemailer");
const xss = require("xss");

RegisterRouter
    .route("/register")
    .all(express.json())
    .get((req, res)=>{
        RegisterService.getUsers(req.app.get("db"))
            .then( data => res.status(200).json({ user: data}));
    })
    .post((req, res)=>{
        const {first_name, last_name, email, mobile_number, password, house_number, apartment_number, street_name, city, state, zip_code} = req.body;

        if(req.body.apartment_number == undefined){
            
            req.body.apartment_number = "null"
        };

        const newUser = {
            first_name, 
            last_name, 
            email, 
            mobile_number,
            password, 
            house_number, 
            apartment_number, 
            street_name, 
            city, 
            state, 
            zip_code
        };

        for( const [key, value] of Object.entries(newUser)){
            if(value === undefined){
                return res.status(400).json({ error: `Missing ${key} in body request`});
            };

            newUser[key] = xss( value, {
                whiteList: [],
                stripIgnoreTag: true,
                stripIgnoreTagBody: ['script']
              });
        };

        RegisterService.getUser(req.app.get("db"), newUser.mobile_number)
            .then( dbUser => {
                if(dbUser){
                    return res.status(400).json({error: "You seem to have an account with us already"})
                };

                RegisterService.hashPassword(newUser.password)
                    .then( hashedPassword => {
                        
                        newUser.password = hashedPassword;

                        RegisterService.insertUser(req.app.get("db"), newUser)
                            .then( createdUser => {

                                const sub = createdUser.mobile_number;
                                const payload = { user: createdUser.id};
                                const mailOptions = {
                                    from: "jasoncarcamo30@yahoo.com",
                                    to: newUser.email,
                                    subject: "Do Not Reply",
                                    html: `<main style="text-align: center;"><p>You have successfully signed up. Log in <a href="https://julis-cleaning-company.jasoncarcamo30.now.sh/login"> here</a><p></main>`
                                };

                                transporter.sendMail( mailOptions, ( error, info)=>{
                                    if(error){
                                        return res.status(400).json({ error });
                                    };
                                });

                                return res.status(201).json({ token: AuthService.createJwt(sub, payload), id: createdUser.id});
                            });
                    });
            });
    });

module.exports = RegisterRouter;