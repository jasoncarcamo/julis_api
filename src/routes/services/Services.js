const Services = {
    getAllServices(db){
        return db.select("*").from("services").returning("*");
    }
}

module.exports = Services;