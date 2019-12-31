const RequestsService = {
    adminGetRequests(db){
        return db.select("*").from("requests").where({confirmed: true});
    },
    getAllRequests(db){
        return db.select("*").from("requests").returning("*");
    },
    getRequestById(db, id){
        return db.select("*").from("requests").where({user_id: id}).returning("*");
    },
    createRequest(db, request){
        return db.insert(request).into("requests").returning('*').then(([request])=> request);
    },
    updateRequest(db, request, id){
        return db.update(request).from("requests").where({id});
    },
    deleteRequest( db, id){
        return db.delete().from("requests").where({ id });
    }
};

module.exports = RequestsService;