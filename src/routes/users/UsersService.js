const UsersService = {
    getUser(db, id){
        return db.select("*").from("users").where({id}).first(); 
    },
    getAllUsers(db){
        return db.select("*").from("users").returning("*");
    }
};

module.exports = UsersService;