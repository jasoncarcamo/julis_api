require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 8000,
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://jason:carcamo11@localhost/api-test',
    NODE_ENV: process.env.NODE_ENV || 'development',    
    NODE_MAILER_PASS: process.env.NODE_MAILER_PASS || "Testing",
    JWT_SECRET: process.env.JWT_SECRET || 'khbqiwbidbiu2',
};