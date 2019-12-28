require("dotenv").config({ path: ".env"});
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
const ChargeRouter = require("../routes/stripe/ChargeRouter");
const ContactRouter = require("../routes/contact/ContactRouter");
const ResetRouter = require("../routes/password/ResetRouter");
const {NODE_ENV} = require("../../config");

app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());

app.use("/api", ServicesRouter);
app.use("/api", RequestsRouter);
app.use("/api", RegisterRouter);
app.use("/api", UsersRouter);
app.use("/api", LoginRouter);
app.use("/api", ChargeRouter);
app.use("/api", ContactRouter);
app.use("/api", ResetRouter);

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
      response = { error: 'Server error' }
    } else {
      
      response = { error: error.message, object: error }
    }
    console.error(error)
    res.status(500).json(response)
  });

app.use("/", (req, res)=>{
    res.send("Working");
});

module.exports = app;

