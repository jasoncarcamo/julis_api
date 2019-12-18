const UsersService = {
    getUser(db, id){
        console.log(id);
        return db.select("*").from("users").where({id}); 
    },
    getAllUsers(db){
        return db.select("*").from("users").returning("*");
    },
    updateUser(db, update, id){
        return db.update(update).from("users").where({ id });
    }
};

module.exports = UsersService;