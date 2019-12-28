require("dotenv").config("../../env");
const app = require("./app");
const knex = require("knex");

const db = knex({
    client: "pg",
    connection: process.env.DATABASE_URL || "postgresql://jason:carcamo11@localhost/julis-api-test"
});

app.set("db", db);

app.listen( process.env.PORT, ()=>{
});