const express = require("express");
const RegisterRouter = express.Router();
const RegisterService = require("./RegisterService");
const AuthService = require("../login/AuthService");

RegisterRouter
    .route("/register")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        RegisterService.getUsers(req.app.get("db"))
            .then( data => res.status(200).json({ user: data}));
    })
    .post((req, res)=>{
        const {first_name, last_name, email, mobile_number, password, house_number, apartment_number, street_name, city, state, zip_code} = req.body;

        if(req.body.apartment_number == undefined){
            console.log("yeah", req.body.first_name)
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
        };

        RegisterService.getUser(req.app.get("db"), newUser.mobile_number)
            .then( dbUser => {
                if(dbUser){
                    return res.status(400).json({error: "You seem to have an account with us already"})
                };

                RegisterService.hashPassword(newUser.password)
                    .then( hashedPassword => {
                        console.log(hashedPassword)
                        newUser.password = hashedPassword;

                        RegisterService.insertUser(req.app.get("db"), newUser)
                            .then( createdUser => {

                                console.log(createdUser);

                                const sub = createdUser.mobile_number;
                                const payload = { user: createdUser.id};

                                return res.status(201).json({ token: AuthService.createJwt(sub, payload), id: createdUser.id});
                            });
                    });
            });
    });

module.exports = RegisterRouter;