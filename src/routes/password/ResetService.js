const ResetService = {
    updatePassword( db, password, id){
        return db.update({password}).from("users").where({id});
    }
};

module.exports = ResetService;