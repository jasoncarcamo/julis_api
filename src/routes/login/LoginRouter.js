const express = require("express");
const LoginRouter = express.Router();
const AuthService = require("./AuthService");

LoginRouter
    .route("/login")
    .all(express.json())
    .all(express.urlencoded({ extended:  true}))
    .post((req, res)=>{
        const { mobile_number, password} = req.body;

        const user = {
            mobile_number,
            password
        };

        for( const [key, value] of Object.entries(user)){
            if(value === null){
                return res.status(400).json({error: `Missing ${key} in body request`});
            };
        };

        AuthService.getUser(req.app.get("db"), user.mobile_number)
            .then( dbUser => {

                if(!dbUser){
                    return res.status(400).json({ error: 'No account exists.'})
                };


                AuthService.comparePassword( user.password, dbUser.password)
                    .then( matches => {
                        if(!matches){
                            return res.status(400).json({ error: "Incorrect password"});
                        };
                        
                        const sub = dbUser.mobile_number;
                        const payload = { user: dbUser.id};

                        return res.status(201).json({ token: AuthService.createJwt(sub, payload)})
                    });
            });
    });

module.exports = LoginRouter;