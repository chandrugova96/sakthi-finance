const VillageRoute = require("express").Router();

const { VillageController } = require("../../controllers");

VillageRoute.get("/", VillageController.get);
VillageRoute.get("/users", VillageController.getUsers);
VillageRoute.get("/user", VillageController.getOneUser);

VillageRoute.post("/createLoan", VillageController.createLoan);
VillageRoute.put("/updateLoan/:loanId", VillageController.updateLoan);
VillageRoute.get("/userLoans", VillageController.getUserLoans);
VillageRoute.get("/loanHistory", VillageController.getLoanHistory);

module.exports = VillageRoute;