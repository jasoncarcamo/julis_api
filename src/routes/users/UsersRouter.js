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
        UsersService.getAllUsers( req.app.get("db"))
            .then( users => {
                return res.status(200).json({ users })
            });
    });

module.exports = UsersRouter;