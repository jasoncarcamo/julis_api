require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {} = require("../../../config");

const AuthService = {
    getUser(db, mobile_number){
        return db.select("*").from("users").where({mobile_number});
    },
    comparePassword(password, hash){
        return bcrypt.compare(password, hash);
    },
    createJwt(subject, payload){
        return jwt.sign(payload, process.env.JWT_SECRET, {
            subject,
            algorithm: 'HS256'
        });
    },
    verifyJwt(token){
        return jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'],
        });
    }
};

module.exports = AuthService;