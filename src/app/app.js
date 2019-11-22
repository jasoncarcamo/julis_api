const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const ServicesRouter = require("../routes/services/ServicesRouter");
const RequestsRouter = require("../routes/requests/RequestRouter");
const RegisterRouter = require("../routes/registration/RegisterRouter");
const UsersRouter = require("../routes/users/UsersRouter");
const LoginRouter = require("../routes/login/LoginRouter");

app.use(morgan("common"));
app.use(cors());
app.use(helmet());

app.use("/api", ServicesRouter);
app.use("/api", RequestsRouter);
app.use("/api", RegisterRouter);
app.use("/api", UsersRouter);
app.use("/api", LoginRouter);

app.use("/", (req, res)=>{
    res.send("Working");
});

module.exports = app;

