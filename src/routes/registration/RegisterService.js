const bcrypt = require("bcryptjs");

const RegisterService = {
    getUsers(db){
        return db.select("*").from("users").returning("*");
    },
    getUser(db, mobile_number){
        return db.select("*").from("users").where({mobile_number}).first();
    },
    insertUser(db, user){
        return db.insert(user).into("users").returning("*").then(([newUser]) => newUser);
    },
    validatePassword(password) {
        if (password.length < 8) {
          return 'Password be longer than 8 characters'
        }
        if (password.length > 72) {
          return 'Password be less than 72 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
          return 'Password must not start or end with empty spaces'
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
          return 'Password must contain one upper case, lower case, number and special character'
        }
        return null
    },
    hashPassword(password){
        return bcrypt.hash(password, 12);
    }
};
module.exports = RegisterService;