const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const ServicesRouter = require("../routes/services/ServicesRouter");
const RequestsRouter = require("../routes/requests/RequestRouter");

app.use(morgan("common"));
app.use(cors());
app.use(helmet());

app.use("/api", ServicesRouter);
app.use("/api", RequestsRouter);

app.use("/", (req, res)=>{
    res.send("Working");
});

module.exports = app;

