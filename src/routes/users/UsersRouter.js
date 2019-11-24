const express = require("express");
const UsersRouter = express.Router();
const UsersService = require("./UsersService");
const {requireAuth} = require("../../middleware/JwtAuth");

UsersRouter
    .route("/users")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .all(requireAuth)
    .get((req, res)=>{
        UsersService.getUser( req.app.get("db"), req.user.id)
            .then( user => {
                return res.status(200).json({ user })
            });
    });

module.exports = UsersRouter;