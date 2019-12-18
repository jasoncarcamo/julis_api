const express = require("express");
const UsersRouter = express.Router();
const UsersService = require("./UsersService");
const {requireAuth} = require("../../middleware/JwtAuth");
const xss = require('xss');


UsersRouter
    .route("/users")
    .all(requireAuth)
    .all(express.json())
    .get((req, res,next)=>{
        UsersService.getUser( req.app.get("db"), req.user.id)
            .then( user => {
                return res.status(200).json({ user })
            })
            .catch(next)
    });

UsersRouter
    .route("/user")
    .all(requireAuth)
    .all(express.json())
    .get((req, res, next)=>{
        UsersService.getUser( req.app.get("db"), req.user.id)
            .then( user => {
                console.log(user);
                return res.status(200).json({
                    id: user.id,
                    first_name: user.first_name,                                  
                    last_name: user.last_name,                                    
                    email: user.email,                                            
                    mobile_number: user.mobile_number,                            
                    house_number: user.house_number,                              
                    apartment_number: user.apartment_number,                      
                    street_name: user.street_name,                                
                    city: user.city,                                              
                    state: user.state,                                            
                    zip_code: user.zip_code
                 });
            })
            .catch(next);
    })
    .patch((req, res)=> {
        const {
            house_number, 
            apartment_number,
            street_name, 
            city, 
            state, 
            zip_code
        } = req.body;

        const newAddress = {
            house_number, 
            apartment_number,
            street_name, 
            city, 
            state, 
            zip_code
        };

        if(!newAddress.apartment_number){
            newAddress.apartment_number = "null";
        };

        for( const [key, value] of Object.entries(newAddress)){
            if(value === undefined){
                return res.status(400).json({ error: `Missing ${key} in body request`});
            };

            newAddress[key] = xss( value, {
                whiteList: [],
                stripIgnoreTag: true,
                stripIgnoreTagBody: ['script']
              });
        };
        
        UsersService.updateUser( req.app.get("db"), newAddress, req.user.id)
            .then( data => {

                const mailOptions = {
                    from: "jasoncarcamo30@yahoo.com",
                    to: req.user.email,
                    subject: "Do Not Reply",
                    html: `<main style="text-align: center;"><p>You have successfully edited your address. View your info <a href="https://julis-cleaning-company.jasoncarcamo30.now.sh/login"> here</a><p></main>`
                };

                transporter.sendMail( mailOptions, ( error, info)=>{
                    if(error){
                        return res.status(400).json({ error });
                    };
                });

                return res.status(200).json({ success: "Your address has been updated"});
            })
            .catch(next);
    })



module.exports = UsersRouter;