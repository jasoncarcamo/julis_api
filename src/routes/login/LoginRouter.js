require("dotenv").config();
const express = require("express");
const LoginRouter = express.Router();
const AuthService = require("./AuthService");
const xss = require("xss");

LoginRouter
    .route("/login")
    .all(express.json())
    .post((req, res, next)=>{
        const { mobile_number, password} = req.body;

        const user = {
            mobile_number,
            password
        };

        for( const [key, value] of Object.entries(user)){
            if(value === undefined){
                return res.status(400).json({error: `Missing ${key} in body request`});
            };

        };

        AuthService.getUser(req.app.get("db"), user.mobile_number)
            .then( dbUser => {
                
                if(!dbUser){
                    return res.status(400).json({ error: 'No account exists.'})
                };

                AuthService.comparePassword( user.password, dbUser[0].password)
                    .then( matches => {
                        
                        if(!matches){
                            return res.status(400).json({ error: "Incorrect password"});
                        };
                        
                        const sub = dbUser[0].mobile_number;
                        const payload = { user: dbUser[0].id};
                        
                        return res.status(200).json({ token: AuthService.createJwt(sub, payload)})
                    })
                    .catch(next)
            })
            .catch(next)
    });

module.exports = LoginRouter;