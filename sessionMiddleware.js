const session = require('express-session');
require('dotenv').config();
const sessionMiddleware = session({
    secret: 'mySecretKey',
    resave: true,
    name: "mathGame",
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        domain: process.env.DOMAIN || "localhost",
        path: "/",
        maxAge: 3600000,
        sameSite: 'lax'
    }
});
module.exports = sessionMiddleware;
