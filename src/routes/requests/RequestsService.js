const RequestsService = {
    getAllRequests(db){
        return db.select("*").from("requests").returning("*");
    },
    createRequest(db, request){
        return db.insert(request).into("requests");
    },
    updateRequest(db, request, id){
        return db.update({service: request}).from("requests").where({id});
    }
};

module.exports = RequestsService;