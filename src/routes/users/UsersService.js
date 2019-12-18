const UsersService = {
    getUser(db, id){
        return db.select("*").from("users").where({id}).returning("*").then(([user]) => user); 
    },
    getAllUsers(db){
        return db.select("*").from("users").returning("*");
    },
    updateUser(db, update, id){
        return db.update(update).from("users").where({ id });
    }
};

module.exports = UsersService;