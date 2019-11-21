const UsersService = {
    getAllUsers(db){
        return db.select("*").from("users").returning("*");
    }
};

module.exports = UsersService;