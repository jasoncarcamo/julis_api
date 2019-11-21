const express = require("express");
const UsersRouter = express.Router();

UsersRouter
    .route("/users")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        
    })