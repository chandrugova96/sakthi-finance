const AuthRoute = require("express").Router();

const { AuthController } = require("../../controllers");

AuthRoute.post("/create", AuthController.create);
AuthRoute.post("/login", AuthController.login);

module.exports = AuthRoute;