const AuthRoute = require("express").Router();

const { AuthController } = require("../../controllers");

AuthRoute.post("/login", AuthController.login);

module.exports = AuthRoute;