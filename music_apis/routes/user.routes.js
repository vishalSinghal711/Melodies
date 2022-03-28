// User Route
// Whenever server get user related requests -> this route takes control

// requiring express package installed from npm
const express = require("express");
// extracting Router functionality from express
const routes = express.Router();

// Post request made by user to register
//if /register type request will be made this will take control
routes.post("/register", require("./user.controller").register);

// Post request made by user to login
//if /login type request will be made this will take control
routes.post("/login", require("./user.controller").login);
module.exports = routes;
