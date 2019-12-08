const express = require("express");
const UsersRouter = express.Router();
const UsersService = require("./UsersService");
const {requireAuth} = require("../../middleware/JwtAuth");


UsersRouter
    .route("/users")
    .all(requireAuth)
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        UsersService.getUser( req.app.get("db"), req.user.id)
            .then( user => {
                return res.status(200).json({ user })
            });
    });

UsersRouter
    .route("/user")
    .all(requireAuth)
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        UsersService.getUser( req.app.get("db"), req.user.id)
            .then( user => {

                return res.status(200).json({
                    id: user.id,
                    first_name: user.first_name,                                   
                    last_name: user.last_name,                                     email: user.email,                                             mobile_number: user.mobile_number,                             house_number: user.house_number,                               apartment_number: user.apartment_number,                       street_name: user.street_name,                                 city: user.city,                                               state: user.state,                                             zip_code: user.zip_code
                 });
            });
    })



module.exports = UsersRouter;